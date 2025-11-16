/**
 * Custom Error class for handling API errors.
 * @module utils/errorHandler
 * @exports APIError
 */
export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Custom Error class for handling validation errors
 */
export class ValidationError extends APIError {
  constructor(message) {
    super(message, 400);
  }
}

/**
 * Custom Error class for handling not found errors
 */
export class NotFoundError extends APIError {
  constructor(message) {
    super(message, 404);
  }
}

/**
 * Custom Error class for handling unauthorized errors
 */
export class UnauthorizedError extends APIError {
  constructor(message) {
    super(message, 401);
  }
}
