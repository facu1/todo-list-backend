import { NextFunction, Request, Response } from "express";
import { NotAuthSubError, NotUserFindError } from "../customErrors";
import { UnauthorizedError } from "express-jwt";

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({ error: "Unknown Endpoint" });
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info(error);
  if (error instanceof UnauthorizedError) {
    res.status(401).json({ error: error.message });
  } else if (error instanceof NotAuthSubError) {
    res.status(401).json({ error: error.message });
  } else if (error instanceof NotUserFindError) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Something was wrong." });
    next(error);
    console.error(error);
  }
};
