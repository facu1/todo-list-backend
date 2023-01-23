import { NextFunction, Response } from "express";
import { ITodo, RequestWithEIDU } from "../../types";
import { Todo } from "../../models";
import {
  NotAuthActionError,
  TodoNotFoundError,
  UserNotFoundError,
} from "../customErrors";

export const extractTodo = async (
  req: RequestWithEIDU,
  _res: Response,
  next: NextFunction
) => {
  try {
    const {
      user,
      params: { id },
    } = req;

    if (!user) throw new UserNotFoundError();

    const todo = await Todo.findById<ITodo>(id);

    if (!todo) throw new TodoNotFoundError();

    if (String(user._id) !== String(todo.user)) throw new NotAuthActionError();

    req.todo = todo;

    next();
  } catch (error) {
    next(error);
  }
};
