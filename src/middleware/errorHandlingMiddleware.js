import { APIError } from "../utils/errorHandler.js";

/**
 * Catches errors and sends appropriate responses.
 * @param {APIError} err - The error object
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @param {*} next - The next middleware function
 */
export default function errorHandlingMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  if (statusCode === 500) console.error(`${err}`);
  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : err.message, // Don't leak internal details!!!
  });
}
