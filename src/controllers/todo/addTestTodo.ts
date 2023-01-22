import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { Todo, User } from "../../models";
import { IUser } from "../../types";
import { NotAuthSubError, NotUserFindError } from "../../customErrors";

export const addTestTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req;
    if (!auth?.sub) throw new NotAuthSubError("Authentication not found");

    const { sub: externalId } = auth;

    const user = await User.findOne<IUser>({ externalId }).populate("todos");

    if (!user)
      throw new NotUserFindError(`Patient with id: ${externalId} not found.`);

    const newTodo = new Todo({
      title: "Test",
      description: "Description Test",
      user: user._id,
    });

    const addedTodo = await newTodo.save();

    user.todos = [...user.todos, addedTodo._id];
    await user.save();

    res.json(addedTodo);
  } catch (error) {
    next(error);
  }
};
