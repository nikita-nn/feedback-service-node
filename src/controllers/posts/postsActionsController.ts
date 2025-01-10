import { Request, Response } from "express";
import { buildRes } from "../../service/system/buildRes";
import { db } from "../../../db/db";
import { Posts } from "../../../db/schema/postSchema";
import { eq } from "drizzle-orm";
import { currentCategories, currentStatuses } from "../../settings";
import {validatePostInfo, validateUpdatePostData} from "../../service/posts/postsService";

export const deletePostController = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);

  if (!postId) {
    return buildRes(400, "No post id specified", res);
  }

  const validatedPost = await validatePostInfo(postId)

  if(!validatedPost.exists) {
    return buildRes(404, "Post does not exists", res);
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

export const updatePostController = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  const updatePostData = req.body;

  if (!postId) {
    return buildRes(400, "No post id specified", res);
  }

  const validatedPost = await validatePostInfo(postId);

  if(!validatedPost.exists) {
    return buildRes(404, "Post does not exists", res);
  }

  const validationDataResult = validateUpdatePostData(updatePostData);

  if (validationDataResult) {
    await db.update(Posts).set(updatePostData).where(eq(Posts.id, postId));
    return buildRes(200, "Post updated successfully", res);
  } else {
    return buildRes(400, "Incorrect data", res);
  }
};
