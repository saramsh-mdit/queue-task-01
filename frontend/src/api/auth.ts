import {
  LoginUserSchemaT,
  RegisterUserSchemaT,
} from "../components/forms/schemas";
import { axiosInstance, axiosInstanceAuth } from "../config/axios";

export async function postRegister(data: RegisterUserSchemaT) {
  return axiosInstance.post("/auth/register", data);
}

export async function postLogin(data: LoginUserSchemaT) {
  return axiosInstance.post("/auth/login", data);
}

export async function getMe() {
  return axiosInstanceAuth.get("/auth/me");
}
