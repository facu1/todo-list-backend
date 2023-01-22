import { Router } from "express";
import { addTestTodo, getTodos } from "../controllers";

const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", addTestTodo);

export default todoRouter;
