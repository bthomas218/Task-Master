import Joi from "joi";

//Schemas
export const taskCreateSchema = Joi.object({
  desc: Joi.string().required(),
  status: Joi.string().valid("To do", "In progress", "complete"),
});

export const taskUpdateSchema = Joi.object({
  desc: Joi.string(),
  status: Joi.string().valid("To do", "In progress", "complete"),
});

export const taskQuerySchema = Joi.object({
  status: Joi.string()
    .valid("All", "To do", "In progress", "complete")
    .default("All"),
});

export const taskIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});
