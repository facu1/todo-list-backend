import { NextFunction, Response } from "express";
import { RequestWithEIDU } from "../../types";
import { Todo } from "../../models";
import { TodoNotFoundError, UserNotFoundError } from "../../utils";

export const removeTodo = async (
  req: RequestWithEIDU,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, todo } = req;

    if (!user) throw new UserNotFoundError();
    else if (!todo) throw new TodoNotFoundError();

    user.todos = user.todos.filter((t) => String(t._id) !== String(todo._id));

    await user.save();
    await Todo.findByIdAndDelete(todo._id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
