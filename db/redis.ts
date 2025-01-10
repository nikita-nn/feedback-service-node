import Redis from "ioredis";
import logMessage from "../src/service/system/logger";

const redis = new Redis({
  host: "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
});

redis.on("error", (err) => {
  logMessage(`Redis error: ${err.message}`, "error", "REDIS");
});

export default redis;
