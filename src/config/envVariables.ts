export const envVariables = {
  PORT: Number(process.env.PORT) ?? 3500,
  SALT: process.env.SALT ?? "SALT",

  POSTGRES_USER: process.env.POSTGRES_USER ?? "myuser",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? "mypassword",
  POSTGRES_DB: process.env.POSTGRES_DB ?? "mydatabase",
  POSTGRES_HOST: process.env.POSTGRES_HOST ?? "127.0.0.1",
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT) ?? 5432,

  PRODUCTION:
    (process.env.PRODUCTION && Boolean(process.env.PRODUCTION)) ?? false,

  MAILTRAP_HOST: process.env.MAILTRAP_HOST ?? "",
  MAILTRAP_USER: process.env.MAILTRAP_USER ?? "",
  MAILTRAP_PASS: process.env.MAILTRAP_PASS ?? "",
  MAILTRAP_EMAIL: process.env.MAILTRAP_EMAIL ?? "",
};
