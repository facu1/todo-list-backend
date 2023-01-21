import { Router } from "express";
import { getTodos } from "../controllers";

const todoRouter = Router();

todoRouter.get("/", getTodos);

export default todoRouter;
