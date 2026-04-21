import {
  createNewTask,
  getTaskbyIdAndUserId,
  getTasksByUserId,
  updateTaskByIdAndUserId,
  deleteTaskByIdAndUserId,
} from "../db/queries/tasks.js";
import type { NewTask, TaskStatus, Task } from "../db/schema.js";
import { NotFoundError } from "../utils/errors.js";

/**
 * Creates a task for the specified user
 * @param userId: the userId of the user the new task belongs to
 * @param newTask: the task
 * @returns the created task
 */
export async function createTask(userId: string, task: NewTask) {
  return await createNewTask({ ...task, userId });
}

/**
 * Lists tasks for the specified user
 * @param userId the userId of the user whose tasks to list
 * @param status optional status to filter by
 * @returns the list of tasks as an array
 */
export async function listTasks(userId: string, status?: TaskStatus) {
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
  const task = await getTaskbyIdAndUserId(taskId, userId);
  if (!task) throw new NotFoundError("Task not found");
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
  if (updates.status === "complete") {
    updates.completedAt = new Date();
  } else if (updates.status) {
    updates.completedAt = null;
  }
  const updatedTask = await updateTaskByIdAndUserId(taskId, userId, updates);
  if (!updatedTask) throw new NotFoundError("Task not found");
  return updatedTask;
}

export async function deleteTask(userId: string, taskId: string) {
  const deletedTask = await deleteTaskByIdAndUserId(taskId, userId);
  if (!deletedTask) throw new NotFoundError("Task not found");
  return deletedTask;
}
