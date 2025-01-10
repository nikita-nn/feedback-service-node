import express from "express";
import { healthCheck } from "./service/system/healthCheck";

import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { corsOptions } from "./settings";
import authRouter from "./routes/authRouter";
import { userRouter } from "./routes/userRouter";

const feedBackService = express();

feedBackService.use(helmet());
feedBackService.use(express.json());
feedBackService.use(compression());
feedBackService.use(cors(corsOptions));

feedBackService.use("/auth", authRouter);
feedBackService.use("/user", userRouter);

feedBackService.listen(process.env.PORT, async () => {
  await healthCheck();
});
