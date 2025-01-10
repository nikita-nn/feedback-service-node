import { Request, Response } from "express";
import { Users } from "../../../db/schema/usersSchema";
import { db } from "../../../db/db";
import { eq } from "drizzle-orm";
import { buildRes } from "../../service/system/buildRes";

export const setAvatarController = async (req: Request, res: Response) => {
  const { link } = req.body;
  await db.update(Users).set({ avatar: link }).where(eq(Users.id, req.user.id));
  return buildRes(200, "Avatar successfully set", res);
};
