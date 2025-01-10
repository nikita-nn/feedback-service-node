import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { GetMeController } from "../controllers/user/getMeController";

export const userRouter = Router();

userRouter.get("/me", authMiddleware, GetMeController);
