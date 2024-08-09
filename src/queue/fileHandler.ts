import fastq, { queueAsPromised } from "fastq";
import { getEmailFromExcel } from "../utils/xlsx";
import { emailQueue } from "./emailHandler";

type Task = {
  fileToProcess: string;
};

async function queueWorker({ fileToProcess }: Task) {
  const data = getEmailFromExcel(fileToProcess);

  data.forEach((email) => {
    emailQueue.push({ email });
  });
}

export const fileQueue: queueAsPromised<Task> = fastq.promise(queueWorker, 1);
