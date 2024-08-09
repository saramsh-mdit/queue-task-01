import jwt from "jsonwebtoken";
import { envVariables } from "../config/envVariables";

const SALT = envVariables.SALT;

export function getToken(data: object) {
  return jwt.sign(data, SALT);
}

export function verifyToken(token: string) {
  return jwt.verify(token, SALT);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
