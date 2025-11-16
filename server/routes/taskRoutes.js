import express from "express";
import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/taskController.js";
import validate from "../middleware/validate.js";
import {
  taskCreateSchema,
  taskQuerySchema,
  taskIdSchema,
  taskUpdateSchema,
} from "../schemas/taskSchemas.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
// TODO: Add authMiddleware to protect routes

// Route to create a new task
router.post("/", validate(taskCreateSchema, "body"), createTaskController);
// Route to get tasks, optionally filtered by status
router.get("/", validate(taskQuerySchema, "query"), getTasksController);
// Route to get a task by its ID
router.get("/:id", validate(taskIdSchema, "params"), getTaskByIdController);
// Route to update a task
router.patch(
  "/:id",
  validate(taskIdSchema, "params"),
  validate(taskUpdateSchema, "body"),
  updateTaskController
);
// Route to delete a task
router.delete("/:id", validate(taskIdSchema, "params"), deleteTaskController);

export default router;
