import express from "express";
import {
  taskCreateSchema,
  taskUpdateSchema,
  taskQuerySchema,
  taskIdSchema,
} from "../schemas/taskSchemas.js";
import {
  validateBody,
  validateQuery,
  validateParams,
} from "../middleware/validationMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post(
  "/",
  authMiddleware,
  validateBody(taskCreateSchema)
  //TODO: Controller function to create a task goes here
);

taskRouter.get(
  "/",
  validateQuery(taskQuerySchema)
  //TODO: Controller function to get tasks goes here
);

taskRouter.get(
  "/:id",
  validateParams(taskIdSchema)
  //TODO: Controller function to get a specific task goes here
);

taskRouter.put(
  "/:id",
  validateParams(taskIdSchema),
  validateBody(taskUpdateSchema)
  //TODO: Controller function to update a task goes here
);

taskRouter.delete(
  "/:id",
  validateParams(taskIdSchema)
  //TODO: Controller function to delete a task goes here
);
