import { NextFunction, Response } from "express";
import { EditStateTodoFields, RequestWithEIDU } from "../../types";
import { TodoNotFoundError } from "../../utils";
import { toEditStateTodo } from "../../utils/bodyParsers";
import { stateChangeValidator } from "./utils";

export const editStateTodo = async (
  req: RequestWithEIDU,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todo } = req;

    if (!todo) throw new TodoNotFoundError();

    const editedTodo = toEditStateTodo(req.body as EditStateTodoFields);

    const validatedTodo = await stateChangeValidator(todo, editedTodo);

    res.json(validatedTodo);
  } catch (error) {
    next(error);
  }
};
