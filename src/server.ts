import express from "express";
import { healthCheck } from "./service/system/healthCheck";
import { initMiddlewares } from "./service/init/initMiddlewares";
import { initRouting } from "./service/init/initRouting";

const feedBackService = express();

initMiddlewares(feedBackService);
initRouting(feedBackService);

feedBackService.listen(process.env.PORT, async () => {
  await healthCheck();
});
