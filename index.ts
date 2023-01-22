import http from "http";
import { connectDb } from "./src/db";
import { config } from "./src/config";
import app from "./src/app";

void connectDb();

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.info(`server started on port ${config.PORT}`);
});
