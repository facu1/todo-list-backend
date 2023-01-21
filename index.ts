import express from "express";
import { connectDb } from "./src/db";
import { config } from "./src/config";
import todoRouter from "./src/routes/todo";
import { jwtCheck } from "./src/utils";

const app = express();

void connectDb();

// app.use(jwtCheck);

app.use("/api/todos", todoRouter);

app.get("/test", jwtCheck, (_req, res) => {
  res.send("test");
});

app.listen(config.PORT, () => {
  console.info("server started on port 3000");
});
