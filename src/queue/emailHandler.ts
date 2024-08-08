import fastq, { queueAsPromised } from "fastq";
import Log from "../utils/logger";

type Task = {
  email: string;
  message?: string;
};

async function queueWorker(arg: Task) {
  Log.info(arg.email);
}

export const emailTaskQueue: queueAsPromised<Task> = fastq.promise(
  queueWorker,
  1
);
