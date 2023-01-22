import { Document, Types } from "mongoose";

export interface IUser extends Document<Types.ObjectId> {
  externalId: string;
  todos: Types.ObjectId[];
}

export interface ITodo extends Document<Types.ObjectId> {
  title: string;
  description?: string;
  user: Types.ObjectId;
}
