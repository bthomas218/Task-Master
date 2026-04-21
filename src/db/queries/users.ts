import { users, type NewUser, type User } from "../schema.js";
import db from "../index.js";
import { eq } from "drizzle-orm";

export async function createNewUser(user: NewUser) {
  const [result] = await db.insert(users).values(user).returning({
    email: users.email,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  });
  return result;
}

export async function getUserByEmail(email: string) {
  const [result] = await db.select().from(users).where(eq(users.email, email));
  return result;
}

export async function getUserById(id: string) {
  const [result] = await db.select().from(users).where(eq(users.id, id));
  return result;
}
