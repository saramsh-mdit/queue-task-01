import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import pinoPretty from "pino-pretty";

import rateLimit from "express-rate-limit";
import { connectToDb } from "./config/database";
import { envVariables } from "./config/envVariables";
import { errorHandler } from "./middleware/errorHandler";
import router from "./router";
import Log from "./utils/logger";

const PORT = envVariables.PORT || 3500;

const server = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 100 requests per window
});

// Middlewares
server.use(
  cors({
    allowedHeaders: ["Authorization", "authorization"],
  })
);
server.use(pinoHttp(pinoPretty({ colorize: true, ignore: "pid,req,res" })));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use("/api/", limiter);
server.use("/api", router);

// error handler
server.use(errorHandler);

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
