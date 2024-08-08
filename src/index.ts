import "dotenv/config";
import express from "express";
import { ConnectToDb } from "./config/dataabse";
import { emailTaskQueue } from "./utils/queue";

const PORT = process.env.PORT || 3500;

const server = express();

server.get("/", async (req, res) => {
  const time = Number((Math.random() * 100).toPrecision(2));
  emailTaskQueue.push({
    email: `something@${time}email.com`,
    time,
  });

  res.send({ message: "Queue is started" });
});

server.get("/:number", async (req, res) => {
  const number = Number(req.params.number) || 1;
  for (let i = 1; i < number; i++) {
    const time = Number((Math.random() * 100).toPrecision(2));

    emailTaskQueue.push({
      email: `something@${time}email.com`,
      time,
    });
  }

  res.send({ message: `${number} - Queue is started` });
});

server.listen(PORT, () => {
  console.log("Server running at PORT:", PORT);
  ConnectToDb();
});
