import fastq, { queueAsPromised } from "fastq";
import { getEmailFromExcel } from "../utils/xlsx";
import { emailTaskQueue } from "./emailHandler";

type Task = {
  fileToProcess: string;
};

async function queueWorker({ fileToProcess }: Task) {
  const data = getEmailFromExcel(fileToProcess);

  data.forEach((email) => {
    emailTaskQueue.push({ email });
  });
}

export const fileTaskQueue: queueAsPromised<Task> = fastq.promise(
  queueWorker,
  1
);
