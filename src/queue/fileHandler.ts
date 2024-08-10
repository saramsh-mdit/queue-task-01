import fastq, { queueAsPromised } from "fastq";
import { Users } from "../entities/users.entity";
import Log from "../utils/logger";
import { getEmailFromExcel } from "../utils/xlsx";
import { emailQueue } from "./emailHandler";

type Task = {
  fileToProcess: string;
  title: string;
  text: string;
  sender_id: string;
};

async function queueWorker(props: Task) {
  const { fileToProcess, title, text, sender_id } = props;
  const data = getEmailFromExcel(fileToProcess);
  console.log(data);
  Log.error(data);
  data.forEach((email) => {
    emailQueue.push({
      to: email,
      title,
      text,
      from: { _id: sender_id } as Users,
    });
  });
}

export const fileQueue: queueAsPromised<Task> = fastq.promise(queueWorker, 1);
