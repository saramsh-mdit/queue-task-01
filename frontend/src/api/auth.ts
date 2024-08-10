import {
  LoginUserSchemaT,
  RegisterUserSchemaT,
} from "../components/forms/schemas";
import { axiosInstance } from "../config/axios";

export function postRegister(data: RegisterUserSchemaT) {
  return axiosInstance.post("/auth/register", data);
}

export function postLogin(data: LoginUserSchemaT) {
  return axiosInstance.post("/auth/login", data);
}

export function getMe() {
  return axiosInstance.get("/auth/me", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}
