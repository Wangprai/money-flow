import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1),
    type: z.enum(["income", "expense"]),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1),
    type: z.enum(["income", "expense"]),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
  query: z.object({}).optional(),
});

export const idParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().uuid(),
  }),
});
