import { Request, Response } from "express";
import { db } from "../../../db/db";
import { Posts } from "../../../db/schema/postSchema";
import { buildRes } from "../../service/system/buildRes";
import { eq } from "drizzle-orm";

export const getPostsController = async (_: Request, res: Response) => {
  const posts = await db.select().from(Posts);
  return buildRes(200, posts, res);
};

export const getSinglePostController = async (req: Request, res: Response) => {
  const postId = req.params.id;

  if (!postId) {
    return buildRes(400, "No posts id specified", res);
  }

  const post = await db
    .select()
    .from(Posts)
    .where(eq(Posts.id, Number(postId)));

  if (!post) {
    return buildRes(404, "Post not found", res);
  }

  return buildRes(200, post, res);
};
