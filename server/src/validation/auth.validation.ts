import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim() // Trim first!
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long"),

    username: z
      .string()
      .trim() // Trim first!
      .lowercase()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username is too long")
      // Regex: Only letters, numbers, and underscores. No spaces.
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),

    email: z
      .string()
      .trim()
      .lowercase()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      ), // Add this line
  }),
});

export type SignupInput = z.infer<typeof signupSchema>["body"];
