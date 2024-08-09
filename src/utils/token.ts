import jwt, { JwtPayload } from "jsonwebtoken";
import { envVariables } from "../config/envVariables";

const SALT = envVariables.SALT;

export type getTokenParam = {
  id: string;
};
export type decodedData = { id: string } & JwtPayload;

export function getToken(data: getTokenParam) {
  return jwt.sign(data, SALT);
}

export function verifyToken(token: string) {
  return jwt.verify(token, SALT);
}

export function decodeToken(token: string) {
  const data = jwt.decode(token);
  return data as decodedData;
}
