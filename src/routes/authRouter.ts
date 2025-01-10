import { Router } from "express";
import { LoginController } from "../controllers/auth/loginController";
import { RegisterController } from "../controllers/auth/registerController";

const authRouter = Router();

authRouter.post("/login", LoginController);

authRouter.post("/register", RegisterController);

export default authRouter;
