import { Request, Response } from "express";
import { blacklistToken } from "../../service/auth/tokenService";
import { buildRes } from "../../service/system/buildRes";

export const logoutController = async (req: Request, res: Response) => {
  await blacklistToken(String(req.token));
  return buildRes(200, "Logout success", res);
};
