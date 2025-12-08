import { APIError } from "../utils/errors.js";
import type { Request, Response, NextFunction } from "express";

/**
 * Catches errors and sends appropriate responses.
 * @param err The error object
 * @param req The request object
 * @param res The response object
 * @param next The next middleware function
 */
export default function errorHandlingMiddleware(
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  if (statusCode === 500) console.error(`${err}`);
  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : err.message, // Don't leak internal details!!!
  });
}
