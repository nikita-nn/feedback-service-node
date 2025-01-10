import { Request, Response } from "express";
import { buildRes } from "../../service/system/buildRes";
import { Posts } from "../../../db/schema/postSchema";

export const getCategoriesController = async (req: Request, res: Response) =>
  buildRes(200, Posts.category.enumValues, res);
