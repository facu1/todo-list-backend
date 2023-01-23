import { EditStateTodo, EditStateTodoFields, TodoState } from "../../../types";
import { baseErrorMsg } from "../baserErrorMsg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTodoState = (state: any): state is TodoState => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(TodoState).includes(state);
};

const parseState = (state: unknown): TodoState | undefined => {
  if (!state) return undefined;

  if (!isTodoState(state)) throw new Error(`${baseErrorMsg} state: ${state}`);

  return state;
};

export const toEditStateTodo = ({
  state,
}: EditStateTodoFields): EditStateTodo => {
  const editTodo: EditStateTodo = {
    state: parseState(state),
  };

  return editTodo;
};
