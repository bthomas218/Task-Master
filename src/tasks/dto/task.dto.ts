import { z } from "zod";

export const taskStatusSchema = z.enum(["todo", "in_progress", "complete"]);

export const taskCreateSchema = z.object({
  description: z.string().min(1, "Description is required"),
  status: taskStatusSchema.default("todo"),
});

export const taskUpdateSchema = z.object({
  description: z.string().min(1, "Description is required").optional(),
  status: taskStatusSchema.optional(),
});

export const taskQuerySchema = z.object({
  status: z.enum(["all", "todo", "in_progress", "complete"]).optional(),
});

export const taskIdSchema = z.object({
  id: z.uuid("Invalid task ID format"),
});

export type TaskStatusDto = z.infer<typeof taskStatusSchema>;
export type CreateTaskDto = z.infer<typeof taskCreateSchema>;
export type UpdateTaskDto = z.infer<typeof taskUpdateSchema>;
export type TaskQueryDto = z.infer<typeof taskQuerySchema>;
export type TaskIdDto = z.infer<typeof taskIdSchema>;
