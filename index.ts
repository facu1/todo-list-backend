import express from "express";
import { connectDb } from "./src/db";
import { config } from "./src/config";
import todoRouter from "./src/routes/todo";

const app = express();

void connectDb();

app.use("/api/todos", todoRouter);

app.listen(config.PORT, () => {
  console.info("server started on port 3000");
});
