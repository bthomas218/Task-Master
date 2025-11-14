import express from "express";
import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/taskController.js";
import validate from "../middleware/validate.js";
import {
  taskCreateSchema,
  taskQuerySchema,
  taskIdSchema,
  taskUpdateSchema,
} from "../schemas/taskSchemas.js";

const router = express.Router();

// Route to create a new task
router.post("/tasks", validate(taskCreateSchema, "body"), createTaskController);
// Route to get tasks, optionally filtered by status
router.get("/tasks", validate(taskQuerySchema, "query"), getTasksController);
// Route to get a task by its ID
router.get(
  "/tasks/:id",
  validate(taskIdSchema, "params"),
  getTaskByIdController
);
// Route to update a task
router.patch(
  "/tasks/:id",
  validate(taskIdSchema, "params"),
  validate(taskUpdateSchema, "body"),
  updateTaskController
);

export default router;
