import { NextFunction, Response } from "express";
import { IUser, RequestWithEIDU } from "../../types";
import { User } from "../../models";
import { NotAuthSubError } from "../customErrors";

export const userExtractor = async (
  req: RequestWithEIDU,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req;

    if (!auth?.sub) throw new NotAuthSubError();

    const { sub: externalId } = auth;

    let user = await User.findOne<IUser>({ externalId }).populate("todos");

    if (!user) {
      const newUser = new User({ externalId, deletedTodos: 0 });

      const addedUser: IUser = await newUser.save();

      user = addedUser;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
