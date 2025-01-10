import { Router } from "express";
import { loginController } from "../controllers/auth/loginController";
import { registerController } from "../controllers/auth/registerController";
import { logoutController } from "../controllers/auth/logoutController";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/login", loginController);

authRouter.post("/register", registerController);

authRouter.post("/logout", authMiddleware, logoutController);

export default authRouter;
