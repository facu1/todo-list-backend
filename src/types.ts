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
  user: Types.ObjectId;
}

export type NewTodo = Pick<ITodo, "title" | "description" | "state">;

export interface NewTodoFields {
  title: unknown;
  description?: unknown;
}

export interface EditTodo extends Omit<NewTodo, "title"> {
  title?: string;
}

export interface EditTodoFields extends Omit<NewTodoFields, "title"> {
  title?: unknown;
}

export type RequestWithEIDU = Request & {
  user?: IUser;
  todo?: ITodo;
};
