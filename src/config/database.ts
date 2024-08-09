import { DataSource } from "typeorm";
import Log from "../utils/logger";
import { envVariables } from "./envVariables";

const path = `${process.cwd()}${envVariables.PRODUCTION ? "/dist" : "/src"}`;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envVariables.POSTGRES_HOST,
  port: envVariables.POSTGRES_PORT,
  username: envVariables.POSTGRES_USER,
  password: envVariables.POSTGRES_PASSWORD,
  database: envVariables.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [`${path}/entities/*.entity.{ts,js}`],
  migrations: [`${path}/migrations/*.{ts,js}`],
  migrationsTableName: "migrations",
  migrationsRun: false,
});

export async function connectToDb() {
  try {
    const success = await AppDataSource.initialize();
    if (success) Log.info("DB CONNECTION SUCCESSFUL");
  } catch (err) {
    Log.error("DB CONNECTION FAILED");
  }
}
