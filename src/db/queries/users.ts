import { users, type NewUser, type User } from "../schema.js";
import db from "../index.js";
import { eq } from "drizzle-orm";

export async function createNewUser(user: NewUser): Promise<User> {
  const [result] = await db.insert(users).values(user).returning();
  return result;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [result] = await db.select().from(users).where(eq(users.email, email));
  return result;
}

export async function getUserById(id: string): Promise<User | null> {
  const [result] = await db.select().from(users).where(eq(users.id, id));
  return result;
}
