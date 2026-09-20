/*import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required"),

  password: z
    .string()
    .min(1, "Password is required")
});*/

// updated for task (secure api)
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required"),

  password: z
    .string()
    .min(1, "Password is required")
});