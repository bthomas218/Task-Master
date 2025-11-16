import * as TaskService from "../services/taskService.js";
import { NotFoundError } from "../utils/errorHandler.js";

// Controller to handle creating a new task
export const createTaskController = async (req, res) => {
  const { desc, status } = req.validated.body;
  const task = await TaskService.createTask(req.db, desc, status);
  res.status(201).json(task);
};

// Controller to handle fetching tasks, optionally filtered by status
export const getTasksController = async (req, res) => {
  const { status } = req.validated.query;
  const tasks = await TaskService.getTasks(req.db, status);
  res.json(tasks);
};

// Controller to handle fetching a task by its ID
export const getTaskByIdController = async (req, res) => {
  const { id } = req.validated.params;
  const task = await TaskService.getTaskById(req.db, id);
  if (!task) throw new NotFoundError("Task not found");
  res.json(task);
};

// Controller to handle updating a task
export const updateTaskController = async (req, res) => {
  const { id } = req.validated.params;
  const { desc, status } = req.validated.body;
  if (!desc && !status) {
    res.status(204).end();
    return;
  }
  const task = await TaskService.updateTask(req.db, id, desc, status);
  if (!task) throw new NotFoundError("Task not found");
  res.json(task);
};

// Controller to handle deleting a task
export const deleteTaskController = async (req, res) => {
  const { id } = req.validated.params;
  const task = await TaskService.deleteTask(req.db, id);
  if (!task) throw new NotFoundError("Task not found");
  res.json(task);
};
