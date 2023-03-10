import { Router } from "express";
import {
  getTodos,
  addTodo,
  editStateTodo,
  // editTodo,
  removeTodo,
} from "../controllers";
import {
  extractTodo,
  tokenExtractor,
  userExtractor,
} from "../utils/middlewares";

export const todoRouter = Router();

todoRouter.use(tokenExtractor);
todoRouter.use(userExtractor);
todoRouter.get("/", getTodos);
todoRouter.post("/", addTodo);
// todoRouter.put("/:id", extractTodo, editTodo);
todoRouter.put("/:id", extractTodo, editStateTodo);
todoRouter.delete("/:id", extractTodo, removeTodo);
