import { Router } from "express";
import { getUser } from "../controllers";
import { tokenExtractor } from "../utils/middlewares";

export const userRouter = Router();

userRouter.use(tokenExtractor);
userRouter.get("/", getUser);
