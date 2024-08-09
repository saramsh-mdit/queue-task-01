import fastq, { queueAsPromised } from "fastq";
import { AppDataSource } from "../config/database";
import { EMAIL_STATUS_ENUM, Emails } from "../entities/emails.entity";
import { Users } from "../entities/users.entity";
import { sendEmail } from "../utils/nodemailer";

type Task = {
  from: Users;
  to: string;
  title?: string;
  text?: string;
};

const EmailRepo = AppDataSource.getRepository(Emails);

async function queueWorker(arg: Task) {
  const newEmail = new Emails();
  newEmail.email = arg.to;
  newEmail.sender = arg.from;
  newEmail.status = EMAIL_STATUS_ENUM.failed;
  try {
    const emailStats = await sendEmail({
      subject: arg.title!,
      to: arg.to,
      text: arg.text?.replace("[Recipient's Name]", arg.to)!,
    });
    if (emailStats) {
      newEmail.status = EMAIL_STATUS_ENUM.success;
      await EmailRepo.save(newEmail);
    }
  } catch (err) {
    await EmailRepo.save(newEmail);
  }
}

export const emailQueue: queueAsPromised<Task> = fastq.promise(queueWorker, 1);
