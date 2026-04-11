import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid JSON in request body",
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Server error",
  });
};
