import { AppDataSource } from "../../config/database";
import { Users } from "../../entities/users.entity";
import { GenerateHash, VerifyHash } from "../../utils/hash";
import { generateMessage } from "../../utils/message";
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
  return generateMessage(
    "Successfully Register User. Check email for validation"
  );
}

async function login(data: LoginUserSchemaT) {
  const user = await UserRepo.findOne({
    where: { email: data.email },
  });
  if (!user) throw generateMessage("User is not registered.", true);
  // if (user.isVerified)
  //   throw generateMessage("User is not verified, check email.", true);
  const isValidUser = await VerifyHash(user.password!, data.password);
  if (isValidUser) {
    const token = getToken({ id: user._id });
    return {
      token,
    };
  } else throw generateMessage("Invalid email or password", true);
}

export default {
  register,
  login,
};
