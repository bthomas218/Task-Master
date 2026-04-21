import { eq, and } from "drizzle-orm";
import db from "../index.js";
import { tasks } from "../schema.js";
import type { Task, NewTask, TaskStatus } from "../schema.js";

export async function createNewTask(task: NewTask) {
  const [result] = await db.insert(tasks).values(task).returning();
  return result;
}

export async function updateTaskById(
  id: string,
  updatedFields: Partial<NewTask>,
) {
  const [result] = await db
    .update(tasks)
    .set(updatedFields)
    .where(eq(tasks.id, id))
    .returning();
  return result;
}

export async function deleteTaskById(id: string) {
  const [result] = await db.delete(tasks).where(eq(tasks.id, id)).returning();
  return result;
}

export async function getTaskbyIdAndUserId(taskId: string, userId: string) {
  const [result] = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)));
  return result;
}

export async function getTasksByUserId(userId: string, status?: TaskStatus) {
  const result = await db
    .select()
    .from(tasks)
    .where(
      and(
        eq(tasks.userId, userId),
        status ? eq(tasks.status, status) : undefined,
      ),
    );
  return result;
}
