import { Request, Response } from "express";
import { UserRepo } from "../modules/auth/auth.service";
import { generateMessage } from "../utils/message";
import { decodeToken, verifyToken } from "../utils/token";

export async function Authorization(req: Request, res: Response, next: any) {
  try {
    const token =
      ((req.headers.Authorization || req.headers.authorization) as string) ??
      "";
    if (token) {
      if (verifyToken(token)) {
        const decodedData = decodeToken(token);
        if (decodedData) {
          const user = await UserRepo.findOne({
            where: { _id: decodedData.id },
          });
          res.locals.user = {
            id: user?._id,
            email: user?.email,
          };
          next();
        }
      } else {
        throw generateMessage("Unauthorized, invalid token", true);
      }
    } else {
      throw generateMessage("Unauthorized, login to continue", true);
    }
  } catch (err) {
    const errResponse = err;
    res.status(401).send(errResponse);
  }
}
