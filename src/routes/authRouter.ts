import { Router } from "express";
import { LoginController } from "../controllers/auth/loginController";
import { RegisterController } from "../controllers/auth/registerController";
import { LogoutController } from "../controllers/auth/logoutController";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/login", LoginController);

authRouter.post("/register", RegisterController);

authRouter.post("/logout", authMiddleware, LogoutController);

export default authRouter;
