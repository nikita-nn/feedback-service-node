import { NextFunction, Request, Response } from "express";
import { buildRes } from "../service/system/buildRes";
import { checkJWTPayload } from "../service/auth/authService";
import { checkTokenBlacklist } from "../service/auth/tokenService";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return buildRes(401, "No token specified", res);

  const blackListStatus = await checkTokenBlacklist(token);

  if (blackListStatus) return buildRes(401, "Token blacklisted", res);

  const tokenData = await checkJWTPayload(token);

  if (tokenData.status) {
    req.user = tokenData.data;
    req.token = token;
    return next();
  } else {
    return buildRes(401, "Invalid token", res);
  }
};
