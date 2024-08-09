import { AppDataSource } from "../../config/database";
import { Users } from "../../entities/users.entity";
import { GenerateHash, VerifyHash } from "../../utils/hash";
import { generateMessage } from "../../utils/message";
import { sendEmail } from "../../utils/nodemailer";
import { getToken } from "../../utils/token";
import { LoginUserSchemaT, RegisterUserSchemaT } from "./schema";

export const UserRepo = AppDataSource.getRepository(Users);

async function register(data: RegisterUserSchemaT) {
  const user = await UserRepo.findOne({
    where: { email: data.email },
  });
  if (user) throw generateMessage("User is already registered.", true);
  const newUser = UserRepo.create({
    email: data.email,
    name: data.name,
    password: await GenerateHash(data.password),
  });
  await UserRepo.save(newUser);
  await sendEmail({
    to: newUser.email!,
    text: `http://localhost:3500/api/auth/verify/${newUser._id!}`,
    subject: "verification",
  });
  return generateMessage(
    "Successfully Register User. Check email for validation"
  );
}

async function login(data: LoginUserSchemaT) {
  const user = await UserRepo.findOneBy({
    email: data.email,
    isVerified: true,
  });
  if (!user) throw generateMessage("User is not registered.", true);
  if (!user.isVerified)
    throw generateMessage("User is not verified, check email.", true);
  const isValidUser = await VerifyHash(user.password!, data.password);
  if (isValidUser) {
    const token = getToken({ id: user._id! });
    return {
      token,
    };
  } else throw generateMessage("Invalid email or password", true);
}

async function verify(id: string) {
  const user = await UserRepo.findOneBy({ _id: id });
  if (!user) throw generateMessage("User is not registered.", true);
  user.isVerified = true;

  await UserRepo.save(user);
  return generateMessage("Successfully verified, Now you can login.");
}
export default {
  register,
  login,
  verify,
};
