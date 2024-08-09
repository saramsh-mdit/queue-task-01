import { AppDataSource } from "../../config/database";
import { Emails } from "../../entities/emails.entity";
import { Templates } from "../../entities/templates.entity";

const TemplateRepo = AppDataSource.getRepository(Templates);
const EmailsRepo = AppDataSource.getRepository(Emails);

async function getEmailTemplates() {
  return await TemplateRepo.find({
    select: {
      _id: true,
      title: true,
    },
  });
}

async function getEmailStatusByUserId(_id: string) {
  return await EmailsRepo.find({
    select: {
      _id: true,
      createdDate: true,
      status: true,
      email: true,
    },
    where: {
      sender: { _id },
    },
  });
}

async function getEmailTemplateById(_id: string) {
  return await TemplateRepo.findOneBy({ _id });
}

export default {
  getEmailTemplates,
  getEmailTemplateById,
  getEmailStatusByUserId,
};
