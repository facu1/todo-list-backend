import { NextFunction, Response } from "express";
import { User } from "../../models";
import { IUser, RequestWithEIDU } from "../../types";
import { NotAuthSubError } from "../../utils";

export const getUser = async (
  req: RequestWithEIDU,
  res: Response,
  next: NextFunction
) => {
  try {
    const { externalId } = req;

    if (!externalId) throw new NotAuthSubError();

    let user = await User.findOne<IUser>({ externalId });

    if (!user) {
      const newUser = new User({ externalId, deletedTodos: 0 });

      const addedUser: IUser = await newUser.save();

      user = addedUser;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};
