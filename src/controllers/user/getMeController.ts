import { Request, Response } from "express";
import { buildRes } from "../../service/system/buildRes";

export const getMeController = async (req: Request, res: Response) => {
  const user = req.user;

  const userResponse = {
    email: user.email,
    avatar: user.avatar,
  };

  return buildRes(200, userResponse, res);
};
