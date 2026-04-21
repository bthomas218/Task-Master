import { notEqual } from "assert";
import {
  createNewTask,
  getTaskbyId,
  getTasksByUserId,
  updateTaskById,
  deleteTaskById,
} from "../db/queries/tasks.js";
import { getUserById } from "../db/queries/users.js";
import type { NewTask, TaskStatus } from "../db/schema.js";
import { ForbiddenError, NotFoundError } from "../utils/errors.js";

/**
 * Creates a task for the specified user
 * @param userId: the userId of the user the new task belongs to
 * @param newTask: the task
 * @returns the created task
 */
export async function createTask(userId: string, task: NewTask) {
  const user = await getUserById(userId);
  if (!user) throw new NotFoundError("User not found");

  task.userId = user.id;

  return await createNewTask(task);
}

/**
 * Lists tasks for the specified user
 * @param userId the userId of the user whose tasks to list
 * @param status optional status to filter by
 * @returns the list of tasks as an array
 */
export async function listTasks(userId: string, status?: TaskStatus) {
  const user = await getUserById(userId);
  if (!user) throw new NotFoundError("User not found");

  const tasks = await getTasksByUserId(userId, status);

  return tasks;
}

/**
 * Gets a task by its ID for the specified user
 * @param userId the userId of the user who owns the task
 * @param taskId the ID of the task to get
 * @returns the task
 */
export async function getTask(userId: string, taskId: string) {
  const user = await getUserById(userId);
  if (!user) throw new NotFoundError("User not found");

  const task = await getTaskbyId(taskId);
  if (!task) throw new NotFoundError("Task not found");
  if (task.userId !== user.id)
    throw new ForbiddenError("Access to task denied");

  return task;
}

/**
 * Updates a task for the specified user
 * @param userId the userId of the user who owns the task
 * @param taskId the ID of the task to update
 * @param updates the fields to update
 * @returns the updated task
 */
export async function updateTask(
  userId: string,
  taskId: string,
  updates: Partial<NewTask>,
) {
  const user = await getUserById(userId);
  if (!user) throw new NotFoundError("User not found");

  const task = await getTaskbyId(taskId);
  if (!task) throw new NotFoundError("Task not found");
  if (task.userId !== user.id)
    throw new ForbiddenError("Access to task denied");

  const updatedTask = updateTaskById(task.id, updates);
  return updatedTask;
}

export async function deleteTask(userId: string, taskId: string) {
  const user = await getUserById(userId);
  if (!user) throw new NotFoundError("User not found");

  const task = await getTaskbyId(taskId);
  if (!task) throw new NotFoundError("Task not found");
  if (task.userId !== user.id)
    throw new ForbiddenError("Access to task denied");

  const deletedTask = deleteTaskById(task.id);
  return deletedTask;
}
