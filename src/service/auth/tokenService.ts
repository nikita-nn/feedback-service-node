import redis from "../../../db/redis";
import logMessage from "../system/logger";

export const blacklistToken = async (token: string) => {
  const ttl = process.env.JWT_LIFETIME || "96h";
  try {
    await redis.set(token, "blacklist", "EX", ttl);
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
    await redis.set(token, "clear", "EX", ttl);
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
