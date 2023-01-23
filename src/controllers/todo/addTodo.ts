import { NextFunction, Response } from "express";
import { NewTodoFields, RequestWithEIDU } from "../../types";
import { Todo } from "../../models";
import { UserNotFoundError } from "../../utils";
import { toNewTodo } from "../../utils/bodyParsers";

export const addTodo = async (
  req: RequestWithEIDU,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (!user) throw new UserNotFoundError();

    const newTodo = toNewTodo(req.body as NewTodoFields);

    const todo = new Todo({ user: user._id, ...newTodo });

    const addedTodo = await todo.save();

    user.todos = [...user.todos, addedTodo._id];

    await user.save();

    res.status(201).json(addedTodo);
  } catch (error) {
    next(error);
  }
};
