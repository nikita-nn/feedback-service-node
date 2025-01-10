import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { GetMeController } from "../controllers/user/getMeController";
import { SetAvatarController } from "../controllers/user/setAvatarController";

export const userRouter = Router();

userRouter.get("/me", authMiddleware, GetMeController);
userRouter.post("/avatar", authMiddleware, SetAvatarController);
