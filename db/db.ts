import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { dbConnectionString } from "../src/settings";

const pool = new Pool({
  connectionString: dbConnectionString,
  max: 50,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool);
