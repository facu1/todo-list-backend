import { EditStateTodo, ITodo, TodoState } from "../../../types";
import { InvalidTodoStateChangeError } from "../../../utils/customErrors";

export const stateChangeValidator = async (
  todo: ITodo,
  editedTodo: EditStateTodo
) => {
  if (
    (todo.state === TodoState.Pending &&
      editedTodo.state === TodoState["In Progress"]) ||
    (todo.state === TodoState["In Progress"] &&
      (editedTodo.state === TodoState.Completed ||
        editedTodo.state === TodoState.Pending))
  ) {
    todo.state = editedTodo.state;

    if (editedTodo.state === TodoState.Completed)
      todo.dateOfCompleted = new Date().toISOString();

    const savedTodo = await todo.save();

    return savedTodo;
  } else if (todo.state !== editedTodo.state) {
    throw new InvalidTodoStateChangeError();
  }

  return todo;
};
