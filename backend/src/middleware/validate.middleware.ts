import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (validatedData.body) {
        req.body = validatedData.body;
      }

      Object.assign(req.query, validatedData.query);
      Object.assign(req.params, validatedData.params);

      next();
    } catch (error: any) {
        console.log(error);
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors ?? error,
        });
      }
  };