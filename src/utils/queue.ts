import fastq, { queueAsPromised } from "fastq";

type Task = {
  email: string;
  message?: string;
  time: number;
};

async function queueWorker(arg: Task) {
  setTimeout(() => {
    console.log(arg.email);
  }, arg.time * 100);
}

export const emailTaskQueue: queueAsPromised<Task> = fastq.promise(
  queueWorker,
  1
);
