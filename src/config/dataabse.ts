import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});

export const ConnectToDb = async () => {
  try {
    const dbConnection = await AppDataSource.initialize();
    if (dbConnection) console.log("Database is connected.");
  } catch (err) {
    console.log("Database connection Failed.");
  }
};
