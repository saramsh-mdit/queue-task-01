import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import pinoPretty from "pino-pretty";

import rateLimit from "express-rate-limit";
import path from "path";
import { connectToDb } from "./config/database";
import { envVariables } from "./config/envVariables";
import { errorHandler } from "./middleware/errorHandler";
import router from "./router";
import Log from "./utils/logger";

const server = express();
const PORT = envVariables.PORT || 3500;
const rootPath = process.cwd();
console.log(rootPath);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 400, // limit each IP requests per window
});

// Middlewares
server.use(
  cors({
    allowedHeaders: [
      "Authorization",
      "authorization",
      "content-type",
      "access-control-allow-headers",
    ],
    origin: "*",
  })
);
server.use(pinoHttp(pinoPretty({ colorize: true, ignore: "pid,req,res" })));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// SERVER STATIC FILE
server.use(express.static(path.join(rootPath, "dist")));

server.use("/api/", limiter);
server.use("/api", router);

server.get("*", (req, res) => {
  const spath = path.join(rootPath, "dist", `index.html`);
  console.log(spath);
  res.sendFile(spath);
});

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
