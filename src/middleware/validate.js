import { ValidationError } from "../utils/errorHandler.js";

/**
 * Middleware to validate request data against a Joi schema.
 * @param {Joi.ObjectSchema} schema - The Joi schema to validate against.
 * @param {string} property - The request property to validate ('body', 'query', etc).
 * @returns {function} Middleware function.
 */
const validate = (schema, property) => (req, res, next) => {
  if (!req.validated) {
    req.validated = {};
  }
  const { error, value } = schema.validate(req[property]);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
  req.validated[property] = value;
  next();
};

export default validate;
