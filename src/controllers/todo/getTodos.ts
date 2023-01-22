import { Response } from "express";
import { Request } from "express-jwt";
import { User } from "../../models";
import { IUser } from "../../types";
import { NotAuthSubError } from "../../customErrors";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { auth } = req;

    if (!auth?.sub) throw new NotAuthSubError("Authentication not found");

    const { sub: externalId } = auth;

    let user = await User.findOne<IUser>({
      externalId,
    }).populate("todos");

    if (!user) {
      const newUser = new User({
        externalId,
      });

      const addedUser: IUser = await newUser.save();

      user = addedUser;
    }

    res.json(user.todos);
  } catch (error) {
    const errorMsg = "Something was wrong.";
    if (error instanceof NotAuthSubError) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: errorMsg });
      console.error(error);
    }
  }
};
