// src/lib/validations/auth.ts
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  username: z
    .string()
    .trim()
    .lowercase()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z.string().trim().lowercase().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),
});

export type SignupInput = z.infer<typeof signupSchema>; // No ["body"] here!
