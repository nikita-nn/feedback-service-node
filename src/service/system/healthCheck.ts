import { sql } from "drizzle-orm";
import { currentEnvVars } from "../../settings";
import logMessage from "./logger";
import { db } from "../../db/db";
import redis from "../../db/redis";

const checkRedis = async () => {
  try {
    await redis.ping();
    logMessage("Redis connected", "success", "REDIS");
  } catch (e) {
    logMessage(`Can't connect redis: ${e.message}`, "error", "REDIS");
    process.exit(1);
  }
};

const checkEnv = () => {
  currentEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      logMessage("Environment error", "error", "SERVICE");
      process.exit(1);
    }
  });
  logMessage("Environment correct", "success", "SERVICE");
};

const checkDB = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    logMessage("Database connection successful", "success", "DB");
  } catch (error) {
    logMessage(`Database connection ${error}`, "error", "DB");
    process.exit(1);
  }
};

export const healthCheck = async () => {
  checkEnv();
  await checkDB();
  await checkRedis();
  logMessage(
    `Service started on port ${process.env.PORT}`,
    "success",
    "SERVICE",
  );
};
