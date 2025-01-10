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
import { votePostController } from "../controllers/posts/votePostController";

const postsRouter = Router();

postsRouter.use(authMiddleware);

postsRouter.get("/", getPostsController);
postsRouter.post("/", createPostController);

postsRouter.patch("/:id", updatePostController);
postsRouter.delete("/:id", deletePostController);
postsRouter.get("/:id", getSinglePostController);

postsRouter.post("/:id/vote/", votePostController);

export default postsRouter;
