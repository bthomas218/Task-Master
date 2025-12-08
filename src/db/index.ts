import cfg from "../config.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: cfg.db.url,
});
const db = drizzle({ client: pool });

export default db;
