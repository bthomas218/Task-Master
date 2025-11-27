import { Pool } from "pg";
import { config } from "dotenv";

//Load Enviroment Variables
config();

//Connect to database
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
