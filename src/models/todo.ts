import { Schema, model } from "mongoose";
import { ITodo } from "../types";

const todoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

todoSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = String(returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Todo = model("Todo", todoSchema);
