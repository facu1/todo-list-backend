import { Router } from "express";
import { addTodo, editTodo, getTodos, removeTodo } from "../controllers";
import { extractTodo, userExtractor } from "../utils/middlewares";

export const todoRouter = Router();

todoRouter.use(userExtractor);
todoRouter.get("/", getTodos);
todoRouter.post("/", addTodo);
todoRouter.put("/:id", extractTodo, editTodo);
todoRouter.delete("/:id", extractTodo, removeTodo);
