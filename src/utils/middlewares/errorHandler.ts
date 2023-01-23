import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";
import {
  InvalidTodoStateChangeError,
  NotAuthActionError,
  NotAuthSubError,
  TodoNotFoundError,
  UserNotFoundError,
} from "../customErrors";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof UnauthorizedError) {
    res.status(401).json({ error: error.message });
  } else if (error instanceof NotAuthSubError) {
    res.status(401).json({ error: "Authentication not found." });
  } else if (error instanceof NotAuthActionError) {
    res.status(401).json({ error: "Action not authorized." });
  } else if (error instanceof UserNotFoundError) {
    res.status(400).json({ error: `User not found.` });
  } else if (error instanceof TodoNotFoundError) {
    res.status(400).json({ error: `Todo not found.` });
  } else if (error instanceof InvalidTodoStateChangeError) {
    res.status(400).json({ error: `Invalid todo state change.` });
  } else if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Something was wrong." });
    next(error);
    console.error(error);
  }
};
