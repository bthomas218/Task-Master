import type { Request, Response } from "express";

interface RequestBody {
  description: string;
  status: string;
}

export async function createTask(
  req: Request<{}, {}, RequestBody>,
  res: Response
) {
  const { description, status } = req.body;
  res.json({
    message: `Creating task`,
    description: description,
    status: status,
  });
}

export async function listTasks(req: Request, res: Response) {
  const { status } = req.query;
  res.json({ message: `Listing tasks`, status: status });
}

export async function getTask(req: Request, res: Response) {
  const { id } = req.params;
  res.json({ message: `Getting task`, id: id });
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { description, status } = req.body;
  res.json({
    message: `Updating task`,
    id: id,
    description: description,
    status: status,
  });
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  res.json({ message: `Deleting task`, id: id });
}
