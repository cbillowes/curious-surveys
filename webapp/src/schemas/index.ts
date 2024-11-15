import { z } from "zod";

export const User = z.object({
  email: z.string(), //.email("Invalid email address"),
  fullName: z.string(), //.min(2, "Full name is required"),
  password: z.string(),
  // .min(8, "Password must be at least 8 characters")
  // .max(64, "Password must be less than 64 characters")
  // .regex(/[a-z]/i, "Password must contain at least one letter")
  // .regex(/\d/, "Password must contain at least one digit"),
});
