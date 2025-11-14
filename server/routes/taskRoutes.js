import express from "express";
import {
  createTaskController,
  getTasksController,
} from "../controllers/taskController.js";
import validate from "../middleware/validate.js";
import { taskCreateSchema, taskQuerySchema } from "../schemas/taskSchemas.js";

const router = express.Router();

// Route to create a new task
router.post("/tasks", validate(taskCreateSchema, "body"), createTaskController);
// Route to get tasks, optionally filtered by status
router.get("/tasks", validate(taskQuerySchema, "query"), getTasksController);

export default router;
