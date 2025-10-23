import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: ".env.local" });

// Load env before creating pool
if (process.env.NODE_ENV !== "development") {
  dotenv.config();
}

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
});

export default pool;
