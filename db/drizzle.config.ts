import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { dbConnectionString } from "../src/settings";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema",
  out: "./db/migrations",
  dbCredentials: { url: dbConnectionString! },
  verbose: true,
  strict: true,
  migrations: {
    table: "migrations",
    schema: "public",
  },
});
