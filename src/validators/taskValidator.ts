import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional()
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional()
});