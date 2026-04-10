import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

/**
 * Higher-order middleware to validate requests against a Zod schema.
 */
export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.issues.map((issue) => ({
            path: issue.path[issue.path.length - 1],
            message: issue.message,
          })),
        });
      }
      next(error);
    }
  };
