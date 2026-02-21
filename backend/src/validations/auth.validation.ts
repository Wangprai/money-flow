import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const loginSchema = registerSchema;