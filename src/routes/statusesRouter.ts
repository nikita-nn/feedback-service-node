import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getStatusesController } from "../controllers/status/statusController";

// TODO: CRUD for statuses

const statusesRouter = Router();

statusesRouter.use(authMiddleware);

statusesRouter.get("/", getStatusesController);

export default statusesRouter;
