import { ValidationError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

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
  bcrypt.hash(password, SALT_ROUNDS, async (err, hashedPassword) => {
    if (err) {
      throw new Error("Error hashing password");
    }

    // Insert new user into the database
    const insertUserQuery =
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)";
    const insertUserValues = [email, hashedPassword];
    await db.query(insertUserQuery, insertUserValues);
  });
};

//TODO: Implement login service
// Service to handle user login
export const loginUser = async (db, email, password) => {
  // Login logic here
};
