import { Request } from "express-jwt";
import { Document, Types } from "mongoose";

export interface IUser extends Document<Types.ObjectId> {
  externalId: string;
  todos: Types.ObjectId[];
}

export enum TodoState {
  "Pending" = "Pending",
  "In Progress" = "In Progress",
  "Completed" = "Completed",
}

export interface ITodo extends Document<Types.ObjectId> {
  title: string;
  description?: string;
  state: TodoState;
  created: string;
  dateOfCompleted?: string;
  user: Types.ObjectId;
}

export type NewTodo = Pick<
  ITodo,
  "title" | "description" | "state" | "created" | "dateOfCompleted"
>;

export interface NewTodoFields {
  title: unknown;
  description?: unknown;
}

export interface EditTodo
  extends Omit<NewTodo, "title" | "created" | "dateOfCompleted"> {
  title?: string;
}

export interface EditTodoFields
  extends Omit<NewTodoFields, "title" | "created" | "dateOfCompleted"> {
  title?: unknown;
}

export interface EditStateTodo {
  state?: TodoState;
}

export interface EditStateTodoFields {
  state?: unknown;
}

export type RequestWithEIDU = Request & {
  user?: IUser;
  todo?: ITodo;
};
