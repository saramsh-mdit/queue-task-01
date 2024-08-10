import { Router } from "express";
import path from "path";
import { fileUpload } from "../../config/fileUpload";
import { fileQueue } from "../../queue/fileHandler";
import { generateMessage } from "../../utils/message";
import emailService from "./email.service";

const EmailController = Router();

EmailController.get("/status", async (req, res) => {
  try {
    const response = await emailService.getEmailStatusByUserId(
      res.locals.user.id
    );
    res.send(response);
  } catch (err) {
    const errResponse = generateMessage("something went wrong", true);

    res.status(500).send(errResponse);
  }
});

EmailController.get("/template", async (req, res) => {
  try {
    const response = await emailService.getEmailTemplates();
    res.send(response);
  } catch (err) {
    const errResponse = generateMessage("something went wrong", true);

    res.status(500).send(errResponse);
  }
});

EmailController.post(
  "/template/:templateId/bulk",
  fileUpload.single("file"),
  async (req, res) => {
    try {
      const templateId = req.params.templateId;
      const emailFilePath = path.join(
        process.cwd(),
        `/public/${req.file?.filename}`
      );
      const template = await emailService.getEmailTemplateById(templateId);
      fileQueue.push({
        fileToProcess: emailFilePath,
        text: template?.text!,
        title: template?.title!,
        sender_id: res.locals.user.id,
      });
      res.send({ message: "Success: Emails are being processed." });
    } catch (err) {
      const errResponse = generateMessage("something went wrong", true);
      res.status(500).send(errResponse);
    }
  }
);

export default EmailController;
