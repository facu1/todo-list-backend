import { NewTodo, NewTodoFields, TodoState } from "../../../types";
import { isString } from "../typeGuards";
import { parseDescription } from "./sharedParsers";

const baseErrorMssg = "Incorrect or missing";

const parseTitle = (title: unknown): string => {
  if (!title || !isString(title))
    throw new Error(`${baseErrorMssg} title: ${title}`);

  return title;
};

export const toNewTodo = ({ title, description }: NewTodoFields): NewTodo => {
  const newTodo: NewTodo = {
    title: parseTitle(title),
    description: parseDescription(description),
    state: TodoState.Pending,
    created: new Date().toISOString(),
  };

  return newTodo;
};
