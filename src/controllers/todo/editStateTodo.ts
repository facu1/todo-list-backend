import { NextFunction, Response } from "express";
import { EditStateTodoFields, RequestWithEIDU, TodoState } from "../../types";
import { InvalidTodoStateChangeError, TodoNotFoundError } from "../../utils";
import { toEditStateTodo } from "../../utils/bodyParsers";

export const editStateTodo = async (
  req: RequestWithEIDU,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todo } = req;

    if (!todo) throw new TodoNotFoundError();

    const editedTodo = toEditStateTodo(req.body as EditStateTodoFields);

    if (
      todo.state === TodoState.Pending &&
      editedTodo.state === TodoState["In Progress"]
    ) {
      todo.state = editedTodo.state;

      const savedTodo = await todo.save();

      res.json(savedTodo);
    } else if (
      todo.state === TodoState["In Progress"] &&
      (editedTodo.state === TodoState.Completed ||
        editedTodo.state === TodoState.Pending)
    ) {
      todo.state = editedTodo.state;

      const savedTodo = await todo.save();

      res.json(savedTodo);
    } else if (todo.state !== editedTodo.state) {
      throw new InvalidTodoStateChangeError();
    } else {
      res.json(todo);
    }
  } catch (error) {
    next(error);
  }
};
