import express from "express";
import { healthCheck } from "./service/system/healthCheck";

import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { corsOptions } from "./settings";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import postsRouter from "./routes/postsRouter";
import categoriesRouter from "./routes/categoriesRouter";
import statusesRouter from "./routes/statusesRouter";

const feedBackService = express();

feedBackService.use(helmet());
feedBackService.use(express.json());
feedBackService.use(compression());
feedBackService.use(cors(corsOptions));

feedBackService.use("/api/v1/auth", authRouter);
feedBackService.use("/api/v1/user", userRouter);
feedBackService.use("/api/v1/posts", postsRouter);
feedBackService.use("/api/v1/categories", categoriesRouter);
feedBackService.use("/api/v1/statuses", statusesRouter);

feedBackService.listen(process.env.PORT, async () => {
  await healthCheck();
});
