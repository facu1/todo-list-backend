import { NextFunction, Response } from "express";
import { RequestWithEIDU } from "../../types";
import { NotAuthSubError } from "../customErrors";

export const tokenExtractor = (
  req: RequestWithEIDU,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req;

    if (!auth?.sub) throw new NotAuthSubError();

    const { sub: externalId } = auth;

    req.externalId = externalId;

    next();
  } catch (error) {
    next(error);
  }
};
