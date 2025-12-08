import dotenv from "dotenv";

dotenv.config();

type Config = {
  port: number;
  host: string;
  db: DbConfig;
};

type DbConfig = {
  url: string;
};

function validateEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not set.`);
  }
  return value;
}

const cfg: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  host: process.env.HOST ?? "localhost",
  db: {
    url: validateEnv("DATABASE_URL"),
  },
};

export default cfg;
