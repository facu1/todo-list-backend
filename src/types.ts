import { Types } from "mongoose";

export interface IUser {
  externalId: string;
  todos: Types.ObjectId[];
}

export interface ITodo {
  title: string;
  description?: string;
  user: Types.ObjectId;
}
