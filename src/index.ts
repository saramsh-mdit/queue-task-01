import cors from "cors";
import "dotenv/config";
import express from "express";
import { pinoHttp } from "pino-http";
import pinoPretty from "pino-pretty";

import { connectToDb } from "./config/database";
import router from "./router";
import Log from "./utils/logger";

const PORT = process.env.PORT || 3500;

const server = express();

// Middlewares
server.use(router);
server.use(pinoHttp(pinoPretty({ colorize: true, ignore: "pid,req,res" })));
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.listen(PORT, () => {
  Log.info(`Server running at PORT:${PORT}`);
  connectToDb();
});
