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
import * as taskController from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post(
  "/",
  authMiddleware,
  validateBody(taskCreateSchema),
  taskController.createTask
);

taskRouter.get("/", validateQuery(taskQuerySchema), taskController.listTasks);

taskRouter.get("/:id", validateParams(taskIdSchema), taskController.getTask);

taskRouter.put(
  "/:id",
  validateParams(taskIdSchema),
  validateBody(taskUpdateSchema),
  taskController.updateTask
);

taskRouter.delete(
  "/:id",
  validateParams(taskIdSchema),
  taskController.deleteTask
);

export default taskRouter;
