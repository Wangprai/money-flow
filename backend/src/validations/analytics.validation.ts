import { z } from "zod";

export const monthQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    month: z.string().regex(/^\d{4}-\d{2}$/),
  }),
});

export const yearQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    year: z.string().regex(/^\d{4}$/),
  }),
});