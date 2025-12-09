import { eq } from "drizzle-orm";
import db from "../index.js";
import { tasks } from "../schema.js";
import type { Task, NewTask } from "../schema.js";

export async function createNewTask(task: NewTask) {
  const [result] = await db.insert(tasks).values(task).returning();
  return result;
}

export async function updateTask(
  id: string,
  updatedFields: Partial<Omit<NewTask, "id" | "userId">>
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

export async function getTaskbyId(id: string) {
  const [result] = await db.select().from(tasks).where(eq(tasks.id, id));
  return result;
}

export async function getTasksByUserId(userId: string) {
  const result = await db.select().from(tasks).where(eq(tasks.userId, userId));
  return result;
}
