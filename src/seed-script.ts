import "reflect-metadata";

import { AppDataSource } from "./config/database";
import { Templates } from "./entities/templates.entity";

const emailTemplates: emailTemplatesT[] = [
  {
    subject: "Welcome Email",
    text: `Dear [Recipient's Name],
    
    We are thrilled to welcome you to the [Company/Organization Name] team! Your skills and experience will be a great addition to our group, and we are excited to see the positive impact you will have here.
    
    As you settle in, please don’t hesitate to reach out if you have any questions or need assistance. We are here to support you and ensure that your transition is as smooth as possible.
    
    Once again, welcome aboard! We look forward to working together and achieving great things.
        `,
  },
  {
    subject: "Congratulatory Email",
    text: `Dear [Recipient's Name],
    
    I am writing to extend my heartfelt congratulations on your recent achievement! Your hard work, dedication, and perseverance have truly paid off, and it is wonderful to see you reach this milestone.
    
    This accomplishment is a testament to your commitment and skill, and it sets a shining example for everyone around you. I have no doubt that you will continue to excel in all your future endeavors.
    
    Once again, congratulations! Please know that we are all so proud of you and excited to see what comes next.
        `,
  },
  {
    subject: "Visit Offer Email",
    text: `Dear [Recipient's Name],
    
    I hope this message finds you well.
    
    We would be delighted to invite you to visit our [office/facility/etc.] at [Company/Organization Name] on [proposed date(s) or time frame]. This visit will provide an opportunity for you to meet our team, tour our facilities, and explore potential areas of collaboration.
    
    We are confident that this visit will be mutually beneficial, and we look forward to discussing how we can work together in the future. Please let us know your availability, and we will do our best to accommodate your schedule.
    
    Thank you for considering our invitation. We look forward to hearing from you soon.
        `,
  },
];

type emailTemplatesT = {
  subject: string;
  text: string;
};

const TemplateRepo = AppDataSource.getRepository(Templates);

async function seed() {
  try {
    await AppDataSource.initialize();
    const data = await Promise.all(
      emailTemplates.map(async (template) => {
        const newTemp = new Templates();
        newTemp.title = template.subject;
        newTemp.text = template.text;
        return await TemplateRepo.save(newTemp);
      })
    );
    if (data) console.log("Successful", data);
  } catch (err) {
    console.log(err);
  }
}
seed();
