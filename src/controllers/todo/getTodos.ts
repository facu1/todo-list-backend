import { Request, Response } from "express";
import { Todo } from "../../models";

export const getTodos = async (_req: Request, res: Response) => {
  const todos = await Todo.find({});

  res.json(todos);
};
