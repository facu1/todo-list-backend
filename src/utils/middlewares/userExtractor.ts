import { NextFunction, Response } from "express";
import { IUser, RequestWithEIDU } from "../../types";
import { User } from "../../models";
import { NotAuthSubError, UserNotFoundError } from "../customErrors";

export const userExtractor = async (
  req: RequestWithEIDU,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { externalId } = req;

    if (!externalId) throw new NotAuthSubError();

    const user = await User.findOne<IUser>({ externalId });

    if (!user) throw new UserNotFoundError();

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
