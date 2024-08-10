import { axiosInstanceAuth } from "../config/axios";

export interface TemplateType {
  _id: string;
  title: string;
  text: string;
}

export function getEmailTemplates() {
  return axiosInstanceAuth.get<TemplateType[]>("/email/template");
}
export interface EmailStatusItem {
  status: string;
  createdDate: Date;
  _id: string;
  email: string;
}
export function getEmailStatus() {
  return axiosInstanceAuth.get<EmailStatusItem[]>("/email/status");
}

export function postBulkEmail(template_id: string, file: Blob) {
  const data = new FormData();
  data.set("file", file);
  return axiosInstanceAuth.post(`/email/template/${template_id}/bulk`, data);
}
