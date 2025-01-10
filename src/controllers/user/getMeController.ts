import { Request, Response } from "express";
import { buildRes } from "../../service/system/buildRes";

export const GetMeController = async (req: Request, res: Response) => {
  return buildRes(200, "Success", res);
};
