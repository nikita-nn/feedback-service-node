import { Request, Response } from "express";
import {
  checkExistingUser,
  hashPassword,
} from "../../service/auth/authService";
import { buildRes } from "../../service/system/buildRes";
import jwt from "jsonwebtoken";

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
    expiresIn: "96h",
  });

  res.cookie("token", token, { httpOnly: true });

  return buildRes(200, { token: token }, res);
};
