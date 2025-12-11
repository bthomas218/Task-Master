import type { RequestHandler } from "express";
import { BadRequestError } from "../utils/errors.js";
import { ZodType, z } from "zod";

const validate = (
  schema: ZodType<any>,
  property: "body" | "params" | "query"
): RequestHandler => {
  return async (req, res, next) => {
    if (property === "query") {
      Object.defineProperty(req, "query", {
        value: { ...req.query }, // Create a new mutable object from the original query
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }
    try {
      const parsedData = await schema.parseAsync(req[property]);
      req[property] = parsedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestError(
          `Validation failed: ${z.prettifyError(error)}`
        );
      } else {
        next(error);
      }
    }
  };
};

export const validateBody = (schema: ZodType<any>): RequestHandler => {
  return validate(schema, "body");
};
export const validateParams = (schema: ZodType<any>): RequestHandler => {
  return validate(schema, "params");
};
export const validateQuery = (schema: ZodType<any>): RequestHandler => {
  return validate(schema, "query");
};
