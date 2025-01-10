import { Request, Response } from "express";
import {
  checkExistingUser,
  hashPassword,
} from "../../service/auth/authService";
import { buildRes } from "../../service/system/buildRes";
import jwt from "jsonwebtoken";
import { addTokenToRedis } from "../../service/auth/tokenService";

export const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userData = await checkExistingUser(email);

  if (!userData.exists) {
    return buildRes(400, "User does not exist", res);
  }

  const hashedUserPassword = hashPassword(password);

  if (userData.user?.password !== hashedUserPassword) {
    return buildRes(401, "Incorrect password", res);
  }

  const token = jwt.sign({ email: email }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME || "96h",
  });

  res.cookie("token", token, { httpOnly: true });
  await addTokenToRedis(token);
  return buildRes(200, { token: token }, res);
};
