import type { Request, Response } from "express";
import * as taskService from "../services/taskService.js";
import { TaskStatus } from "../db/schema.js";
import { desc } from "drizzle-orm";

interface RequestBody {
  description: string;
  status: "to do" | "in progress" | "complete" | undefined;
}

export async function createTask(
  req: Request<{}, {}, RequestBody>,
  res: Response
) {
  const { description, status } = req.body;
  const userId = req.user!.id; // Route is protected so safe to assert its existence
  const task = await taskService.createTask(userId, {
    description: description,
    status: status,
    userId: userId,
  });
  res.json(task);
}

export async function listTasks(req: Request, res: Response) {
  const { status } = req.query as { status?: TaskStatus };
  const userId = req.user!.id;
  const tasks = await taskService.listTasks(userId, status);
  res.json(tasks);
}

export async function getTask(req: Request, res: Response) {
  const { id: taskId } = req.params;
  const userId = req.user!.id;
  const task = await taskService.getTask(userId, taskId);
  res.json(task);
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { description, status } = req.body;
  if (!description && !status) {
    return res.status(204).send();
  }
  const task = await taskService.updateTask(req.user!.id, id, {
    description,
    status,
  });
  res.json(task);
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;

  const task = await taskService.deleteTask(req.user!.id, id);
  res.json(task);
}
