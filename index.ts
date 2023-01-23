import connectDb from "./src/db";
import http from "http";
import app from "./src/app";
import config from "./src/config";

void connectDb();

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.info(`server started on port ${config.PORT}`);
});
