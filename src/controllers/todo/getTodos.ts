import { NextFunction, Response } from "express";
import { Todo } from "../../models";
import { RequestWithEIDU } from "../../types";
import { UserNotFoundError } from "../../utils";

export const getTodos = async (
  req: RequestWithEIDU,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (!user) throw new UserNotFoundError();

    const todos = await Todo.find({ user: user._id });

    res.json(todos);
  } catch (error) {
    next(error);
  }
};
