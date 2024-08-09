import { ZodError } from "zod";
import { generateMessage } from "./message";

export function ZodErrorToString(error: ZodError) {
  const firstIssue = error.issues[0];
  let message = `${firstIssue.path[0]}: ${firstIssue.message}`;
  return generateMessage(message);
}
