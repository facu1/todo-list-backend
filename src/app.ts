import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo";
import { errorHandler, jwtCheck, unknownEndpoint } from "./utils";

const app = express();

app.use(cors());
app.use(express.json());
app.use(jwtCheck);

app.use("/api/todos", todoRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
