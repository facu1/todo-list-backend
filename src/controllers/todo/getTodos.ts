import { NextFunction, Response } from "express";
import { RequestWithEIDU } from "../../types";
import { UserNotFoundError } from "../../utils";

export const getTodos = async (
  req: RequestWithEIDU,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (!user) throw new UserNotFoundError();

    const userPopulated = await user.populate("todos");

    res.json(userPopulated.todos);
  } catch (error) {
    next(error);
  }
};
