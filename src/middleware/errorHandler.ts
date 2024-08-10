import { Request, Response } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: any
) {
  res.status(500).send("Something broke!");
}
