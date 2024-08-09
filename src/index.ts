import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import pinoPretty from "pino-pretty";

import { connectToDb } from "./config/database";
import { envVariables } from "./config/envVariables";
import router from "./router";
import Log from "./utils/logger";

const PORT = envVariables.PORT || 3500;

const server = express();

// Middlewares
server.use(router);
server.use(pinoHttp(pinoPretty({ colorize: true, ignore: "pid,req,res" })));
server.use(express.urlencoded({ extended: true }));
server.use(cors());

async function startServer() {
  try {
    await connectToDb();
    server.listen(PORT, () => {
      Log.info(`Server running at PORT:${PORT}`);
    });
  } catch (err: any) {
    Log.error(err?.message);
    process.exit();
  }
}

startServer();
