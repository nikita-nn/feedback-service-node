import logMessage from "./logger";
import { sql } from "drizzle-orm";
import { currentEnvVars } from "../settings";
import { db } from "../../db/db";

function checkEnv() {
  currentEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      logMessage("Environment error", "error", "SERVICE");
      process.exit(1);
    }
  });
  logMessage("Environment correct", "success", "SERVICE");
}

async function checkDB() {
  try {
    await db.execute(sql`SELECT 1`);
    logMessage("Database connection successful", "success", "DB");
  } catch (error) {
    logMessage(`Database connection ${error}`, "error", "DB");
    process.exit(1);
  }
}

export async function healthCheck() {
  checkEnv();
  await checkDB();
  logMessage(
    `Service started on port ${process.env.PORT}`,
    "success",
    "SERVICE",
  );
}
