import {Application, Router} from "express";
import authRouter from "../../routes/authRouter";

export const initRouting = (service: Application) => {
    service.use("/api/v1", (router: Router)=>{
        router.use("/auth", authRouter);
    })
}