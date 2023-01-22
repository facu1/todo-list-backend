import { Schema, model } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  externalId: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject: IUser) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const User = model("User", userSchema);
