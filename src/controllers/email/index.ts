import { Router } from "express";
import path from "path";
import { fileUpload } from "../../config/fileUpload";
import { emailQueue } from "../../queue/emailHandler";
import { fileQueue } from "../../queue/fileHandler";

const EmailController = Router();

EmailController.get("/", async (req, res) => {
  const time = Number((Math.random() * 100).toPrecision(2));
  emailQueue.push({
    email: `something@${time}email.com`,
  });

  res.send({ message: "Queue is started" });
});

EmailController.get("/:number", async (req, res) => {
  const number = Number(req.params.number) || 1;
  for (let i = 1; i < number; i++) {
    const time = Number((Math.random() * 100).toPrecision(2));

    emailQueue.push({
      email: `something@${time}email.com`,
    });
  }

  res.send({ message: `${number} - Queue is started` });
});

EmailController.post("/bulk", fileUpload.single("file"), async (req, res) => {
  const emailFilePath = path.join(
    process.cwd(),
    `/public/${req.file?.filename}`
  );
  fileQueue.push({ fileToProcess: emailFilePath });
  res.send({ message: "Data is being processed." });
});

export default EmailController;
