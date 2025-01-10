import { Request, Response } from "express";
import { buildRes } from "../../service/system/buildRes";
import { db } from "../../../db/db";
import { Posts } from "../../../db/schema/postSchema";
import { eq } from "drizzle-orm";
import { currentCategories, currentStatuses } from "../../settings";

export const deletePostController = async (req: Request, res: Response) => {
  const postId = req.params.id;

  if (!postId) {
    return buildRes(400, "No posts id specified", res);
  }

  await db.delete(Posts).where(eq(Posts.id, Number(postId)));
  return buildRes(200, "Post deleted successfully", res);
};

export const createPostController = async (req: Request, res: Response) => {
  const { title, description, status, category } = req.body;

  if (
    !title ||
    !description ||
    !currentStatuses.includes(status) ||
    !currentCategories.includes(category)
  ) {
    return buildRes(400, "Incorrect data", res);
  }

  await db.insert(Posts).values({
    title: title,
    description: description,
    status: status,
    category: category,
    author_id: req.user.id,
  });
  return buildRes(200, "Post created successfully", res);
};

export const updatePostController = async (req: Request, res: Response) => {};
