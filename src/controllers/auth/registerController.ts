import { Request, Response } from "express";
import { buildRes } from "../../service/system/buildRes";
import {
  checkExistingUser,
  hashPassword,
} from "../../service/auth/authService";
import { db } from "../../../db/db";
import { Users } from "../../../db/schema/userSchema";

export const RegisterController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return buildRes(400, "Username or password is missing", res);
  }

  const userData = await checkExistingUser(email);

  if (userData.exists) {
    return buildRes(400, "User already exists", res);
  }

  await db
    .insert(Users)
    .values({ email: email, password: hashPassword(password) });
  buildRes(200, "User successfully registered", res);
};
