import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getCategoriesController } from "../controllers/category/categoryController";

// TODO: CRUD for categories

const categoriesRouter = Router();

categoriesRouter.use(authMiddleware);

categoriesRouter.get("/", getCategoriesController);

export default categoriesRouter;
