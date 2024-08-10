import { envVariables } from "../../config/envVariables";
import Log from "../logger";

const nodemailer = require("nodemailer");

// config
const transporter = nodemailer.createTransport({
  host: envVariables.MAILTRAP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: envVariables.MAILTRAP_USER,
    pass: envVariables.MAILTRAP_PASS,
  },
});

type sendEmailProp = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail(props: sendEmailProp) {
  try {
    const info = await transporter.sendMail({
      from: `"Email_Processor" <${envVariables.MAILTRAP_EMAIL}>`,
      to: props.to,
      subject: props.subject,
      text: props.text,
    });
    Log.info(info);
    if (info) {
      return {
        message: "Email send successful",
        success: true,
      };
    }
  } catch (err) {
    Log.error(err);
    throw {
      message: "Email send unsuccessful",
      success: false,
    };
  }
}
