import { Request, Response } from "express";
import { buildRes } from "../../service/system/buildRes";
import { Posts } from "../../../db/schema/postsSchema";

export const getStatusesController = async (req: Request, res: Response) =>
  buildRes(200, Posts.status.enumValues, res);
