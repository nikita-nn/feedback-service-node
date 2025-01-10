import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getMeController } from "../controllers/user/getMeController";
import { setAvatarController } from "../controllers/user/setAvatarController";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getMeController);
userRouter.post("/avatar", authMiddleware, setAvatarController);

export default userRouter;

