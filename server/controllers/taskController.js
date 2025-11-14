import * as TaskService from "../services/taskService.js";

// Controller to handle creating a new task
export const createTaskController = async (req, res) => {
  const { desc, status } = req.validated.body;
  try {
    const task = await TaskService.createTask(req.db, desc, status);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Controller to handle fetching tasks, optionally filtered by status
export const getTasksController = async (req, res) => {
  const { status } = req.validated.query;
  try {
    const tasks = await TaskService.getTasks(req.db, status);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export const getTaskByIdController = async (req, res) => {
  const { id } = req.validated.params;
  try {
    const task = await TaskService.getTaskById(req.db, id);
    if (!task) {
      res.status(404).json({ Error: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
