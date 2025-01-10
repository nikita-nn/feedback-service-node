import redis from "../../../db/redis";
import logMessage from "../system/logger";
import ms from "ms";

export const blacklistToken = async (token: string) => {
  const ttl = process.env.JWT_LIFETIME || "96h";
  try {
    await redis.set(`blacklist:${token}`, "blacklist", "EX", ms(ttl) / 1000);
  } catch (err) {
    logMessage(
      `Blacklisting token error: ${err.message}`,
      "error",
      "AUTH + REDIS",
    );
  }
};

export const addTokenToRedis = async (token: string) => {
  const ttl = process.env.JWT_LIFETIME || "96h";
  try {
    await redis.set(token, "clear", "EX", ms(ttl) / 1000);
  } catch (err) {
    logMessage(`Add token error: ${err.message}`, "error", "AUTH + REDIS");
  }
};

export const checkTokenBlacklist = async (token: string) => {
  try {
    const result = await redis.get(`blacklist:${token}`);
    return !!result;
  } catch (err) {
    logMessage(
      `Checking token blacklist error: ${err.message}`,
      "error",
      "AUTH + REDIS",
    );
    return false;
  }
};
