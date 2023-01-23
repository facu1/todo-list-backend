import { EditTodo, EditTodoFields } from "../../../types";
import { baseErrorMsg } from "../baserErrorMsg";
import { isString } from "../typeGuards";
import { parseDescription } from "./sharedParsers";

const parseTitle = (title: unknown): string | undefined => {
  if (!title) return undefined;

  if (!isString(title)) throw new Error(`${baseErrorMsg} title: ${title}`);

  return title;
};

export const toEditTodo = ({
  title,
  description,
}: EditTodoFields): EditTodo => {
  const editTodo: EditTodo = {
    title: parseTitle(title),
    description: parseDescription(description),
  };

  return editTodo;
};
