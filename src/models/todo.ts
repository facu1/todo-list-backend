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
  state: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

todoSchema.set("toJSON", {
  transform: (_document, returnedObject: ITodo) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Todo = model("Todo", todoSchema);
