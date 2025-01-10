import { Router } from "express";
import {
  createPostController,
  deletePostController,
  updatePostController,
} from "../controllers/posts/postsActionsController";
import {
  getPostsController,
  getSinglePostController,
} from "../controllers/posts/postsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const postsRouter = Router();

postsRouter.use(authMiddleware);

postsRouter.get("/", getPostsController);
postsRouter.post("/", createPostController);

postsRouter.patch("/:id", updatePostController);
postsRouter.delete("/:id", deletePostController);
postsRouter.get("/:id", getSinglePostController);

export default postsRouter;
