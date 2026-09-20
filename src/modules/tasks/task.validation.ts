/*import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required"),

  description: z
    .string()
    .min(1, "Description is required")
});*/

// improving for task (secure api)
import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must not exceed 500 characters")
});