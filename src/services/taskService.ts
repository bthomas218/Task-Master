import {
  createNewTask,
  getTaskbyIdAndUserId,
  getTasksByUserId,
  updateTaskById,
  deleteTaskById,
} from "../db/queries/tasks.js";
import type { NewTask, TaskStatus, Task } from "../db/schema.js";
import { NotFoundError } from "../utils/errors.js";

/**
 * Helper function to ensure a task exists and belongs to the user
 * @param taskId the ID of the task
 * @param userId the ID of the user
 * @returns the task if it exists
 * @throws NotFoundError if the task is not found
 */
async function ensureTaskExists(taskId: string, userId: string): Promise<Task> {
  const task = await getTaskbyIdAndUserId(taskId, userId);
  if (!task) throw new NotFoundError("Task not found");
  return task;
}

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
  return await ensureTaskExists(taskId, userId);
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
  const task = await ensureTaskExists(taskId, userId);

  const updatedTask = await updateTaskById(task.id, updates);
  return updatedTask;
}

export async function deleteTask(userId: string, taskId: string) {
  const task = await ensureTaskExists(taskId, userId);

  const deletedTask = await deleteTaskById(task.id);
  return deletedTask;
}
