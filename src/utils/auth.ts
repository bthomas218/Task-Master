import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { type JwtPayload } from "jsonwebtoken";

export async function hashPassword(password: string) {
  return await argon2.hash(password);
}

export async function verifyPassword(
  hashedPassword: string,
  plainPassword: string,
) {
  return await argon2.verify(hashedPassword, plainPassword);
}

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

/**
 * Generates a JWT token for a given user ID
 * @param userId The ID of the user for whom the token is being generated
 * @param expiresIn The time the token expires in seconds
 * @param jwtSecret The secret key used to sign the JWT
 */
export function generateToken(
  userId: string,
  expiresIn: number,
  jwtSecret: string,
) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresIn;

  const tokenPayload: payload = {
    iss: "Task-Master",
    sub: userId,
    iat: iat,
    exp: exp,
  };
  return jwt.sign(tokenPayload, jwtSecret);
}

/**
 * Decodes a jwt token
 * @param token The token to decode
 * @param jwtSecret The secret key used to sign the JWT
 * @return The decoded token payload
 */
export function decodeToken(token: string, jwtSecret: string) {
  return jwt.verify(token, jwtSecret) as payload;
}
