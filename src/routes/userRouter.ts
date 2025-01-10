import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getMeController } from "../controllers/user/userController";
import { setAvatarController } from "../controllers/user/avatarController";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getMeController);
userRouter.post("/avatar", authMiddleware, setAvatarController);

export default userRouter;
