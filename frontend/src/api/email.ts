import { axiosInstanceAuth } from "../config/axios";

export function getEmailTemplates() {
  return axiosInstanceAuth.get("/email/template");
}

export function getEmailStatus() {
  return axiosInstanceAuth.get("/email/email-status");
}

export function postBulkEmail(template_id: string, file: Blob) {
  const data = new FormData();
  data.set("file", file);
  return axiosInstanceAuth.post(`/email/template/${template_id}/bulk`, data);
}
