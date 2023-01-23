import express from "express";
import cors from "cors";
import { jwtCheck } from "./utils";
import { todoRouter } from "./routes";
import { errorHandler, unknownEndpoint } from "./utils/middlewares";

const app = express();

app.use(cors());
app.use(express.json());
app.use(jwtCheck);

app.use("/api/todos", todoRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
