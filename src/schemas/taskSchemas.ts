import * as z from "zod";

export const taskCreateSchema = z.object({
  description: z.string().min(1, "Description is required"),
  status: z.enum(["to do", "in progress", "complete"]).default("to do"),
});

export const taskUpdateSchema = z.object({
  description: z.string().optional(),
  status: z.enum(["to do", "in progress", "complete"]).optional(),
});

export const taskQuerySchema = z.object({
  status: z.enum(["all", "to do", "in progress", "complete"]).default("all"),
});

export const taskIdSchema = z.object({
  id: z.uuid("Invalid task ID format"),
});
