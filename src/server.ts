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
import { generateMockPosts } from "./service/mock/generateMockPosts";

const feedBackService = express();

feedBackService.use(helmet());
feedBackService.use(express.json());
feedBackService.use(compression());
feedBackService.use(cors(corsOptions));

feedBackService.use("/auth", authRouter);
feedBackService.use("/user", userRouter);
feedBackService.use("/posts", postsRouter);
feedBackService.use("/categories", categoriesRouter);
feedBackService.use("/statuses", statusesRouter);

feedBackService.listen(process.env.PORT, async () => {
  await healthCheck();
});
