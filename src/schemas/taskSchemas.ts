import * as z from "zod";

const taskCreateSchema = z.object({
  description: z.string().min(1, "Description is required"),
  status: z.enum(["to do", "in progress", "complete"]).default("to do"),
});

const taskUpdateSchema = z.object({
  description: z.string().optional(),
  status: z.enum(["to do", "in progress", "complete"]).optional(),
});

const taskQuerySchema = z.object({
  status: z.enum(["all", "to do", "in progress", "complete"]).default("all"),
});

const taskIdSchema = z.object({
  id: z.uuid("Invalid task ID format"),
});
