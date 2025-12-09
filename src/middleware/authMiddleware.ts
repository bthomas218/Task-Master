import type { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/auth.js";
import { UnauthorizedError } from "../utils/errors.js";
import cfg from "../config.js";

/**
 * Validates jwt in the headers and attaches the user to the request object
 * @param req The request object which should contain the jwt in the Authorization header
 * @param res The response object
 * @param next The next middleware function
 */
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthorizedError("Missing or invalid Authorization header");

  const token = authHeader.replace("Bearer", "").trim();

  let decodedToken;
  try {
    decodedToken = decodeToken(token, cfg.jwtSecret);
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  if (!decodedToken.sub)
    throw new UnauthorizedError("Token missing subject claim");

  if (!decodedToken.iss || decodedToken.iss !== "Task-Master")
    throw new UnauthorizedError("Token has invalid issuer");

  req.user = { id: decodedToken.sub };
  next();
}
