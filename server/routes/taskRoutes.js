import express from "express";
import { createTaskController } from "../controllers/taskController.js";
import validate from "../middleware/validate.js";
import { taskCreateSchema } from "../schemas/taskSchemas.js";

const router = express.Router();

// Route to create a new task
router.post("/tasks", validate(taskCreateSchema, "body"), createTaskController);

export default router;
