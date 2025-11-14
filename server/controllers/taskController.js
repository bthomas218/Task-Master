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
