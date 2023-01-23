import { NextFunction, Response } from "express";
import { EditTodoFields, RequestWithEIDU } from "../../types";
import { TodoNotFoundError } from "../../utils";
import { toEditTodo } from "../../utils/bodyParsers";

export const editTodo = async (
  req: RequestWithEIDU,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todo } = req;

    if (!todo) throw new TodoNotFoundError();

    const editedTodo = toEditTodo(req.body as EditTodoFields);

    todo.title = editedTodo.title || todo.title;
    todo.description = editedTodo.description || todo.description;

    const savedTodo = await todo.save();

    res.json(savedTodo);
  } catch (error) {
    next(error);
  }
};
