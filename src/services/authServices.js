import { ValidationError, UnauthorizedError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

/**
 * Service to register a new user
 * @param {*} db - Database connection
 * @param {*} email - The email of the new user
 * @param {*} password - The plaintext password of the new user
 */
export const registerUser = async (db, email, password) => {
  // Check if user already exists
  const existingUserQuery = "SELECT * FROM users WHERE email = $1";
  const existingUserResult = await db.query(existingUserQuery, [email]);
  if (existingUserResult.rows.length > 0) {
    throw new ValidationError("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  // Insert new user into the database
  const insertUserQuery =
    "INSERT INTO users (email, password_hash) VALUES ($1, $2)";
  const insertUserValues = [email, hashedPassword];
  await db.query(insertUserQuery, insertUserValues);
};

/**
 * Service to login a user
 * @param {*} db - The database connection
 * @param {*} email - The user's email
 * @param {*} password - The user's plaintext password
 */
export const loginUser = async (db, email, password) => {
  // Retrieve user from the database
  const userQuery = "SELECT email, password_hash FROM users WHERE email = $1";
  const userResult = await db.query(userQuery, [email]);
  if (userResult.length === 0) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const storedHash = userResult.rows[0].password_hash;
  const isMatch = await bcrypt.compare(password, storedHash);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // Generate JWT token
  const userId = userResult.rows[0].id;
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
