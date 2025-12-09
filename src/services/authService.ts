import { createNewUser, getUserByEmail } from "../db/queries/users.js";
import { hashPassword, verifyPassword, generateToken } from "../utils/auth.js";
import { BadRequestError, UnauthorizedError } from "../utils/errors.js";
import { omit } from "../utils/typing.js";
import cfg from "../config.js";

/**
 * Service to register a new user
 * @param email The email of the new user
 * @param password The plaintext password of the new user
 * @returns
 */
export async function registerUser(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new BadRequestError("User already exists");

  const passwordHash = await hashPassword(password);
  const newUser = await createNewUser({ email, passwordHash });
  return omit(newUser, "passwordHash");
}

/**
 * Service to authenticate a user
 * @param email The email of the user to authenticate
 * @param password The plaintext password of the user to authenticate
 */
export async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) throw new UnauthorizedError("Invalid email or password");

  if (!(await verifyPassword(user.passwordHash, password))) {
    throw new UnauthorizedError("Invalid email or password");
  }

  return generateToken(user.id, 3600, cfg.jwtSecret);
}
