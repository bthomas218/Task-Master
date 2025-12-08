import dotenv from "dotenv";

dotenv.config();

type Config = {
  port: number;
  host: string;
};

const cfg: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  host: process.env.HOST ?? "localhost",
};

export default cfg;
