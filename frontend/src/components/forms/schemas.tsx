import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6),
});

export type RegisterUserSchemaT = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserSchemaT = z.infer<typeof LoginUserSchema>;
