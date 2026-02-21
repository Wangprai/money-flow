import { z } from "zod";

export const createTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    categoryId: z.string().uuid(),
    date: z.string().datetime(),
    note: z.string().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const updateTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    categoryId: z.string().uuid().optional(),
    date: z.string().datetime().optional(),
    note: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
  query: z.object({}).optional(),
});

export const transactionQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    type: z.enum(["income", "expense"]).optional(),
    categoryId: z.string().uuid().optional(),
  }),
});

export const idParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().uuid(),
  }),
});