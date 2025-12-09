/**
 * Custom Error class for handling API errors.
 * @module utils/errorHandler
 * @exports APIError
 */
export class APIError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Custom Error class for handling bad request errors
 */
export class BadRequestError extends APIError {
  constructor(message: string) {
    super(message, 400);
  }
}

/**
 * Custom Error class for handling not found errors
 */
export class NotFoundError extends APIError {
  constructor(message: string) {
    super(message, 404);
  }
}

/**
 * Custom Error class for handling unauthorized errors
 */
export class UnauthorizedError extends APIError {
  constructor(message: string) {
    super(message, 401);
  }
}

/**
 * Custom Error class for handling forbidden errors
 */
export class ForbiddenError extends APIError {
  constructor(message: string) {
    super(message, 403);
  }
}
