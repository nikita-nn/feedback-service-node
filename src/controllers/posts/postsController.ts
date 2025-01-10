import { Request, Response } from "express";
import { db } from "../../../db/db";
import { Posts } from "../../../db/schema/postsSchema";
import { buildRes } from "../../service/system/buildRes";
import { and, eq } from "drizzle-orm";
import { currentCategories, currentStatuses } from "../../settings";
import { validatePostInfo } from "../../service/posts/postsService";

export const getPostsController = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const category = req.query.category as string;
  const status = req.query.status as string;
  const sortBy = req.query.sort_by || "date";

  if (
    (category && !currentCategories.includes(category)) ||
    (status && !currentStatuses.includes(status))
  ) {
    return buildRes(200, [], res);
  }

  const posts = await db
    .select()
    .from(Posts)
    .where(
      and(
        category ? eq(Posts.category, category) : undefined,
        status ? eq(Posts.status, status) : undefined,
      ),
    )
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(Posts.id);

  return buildRes(200, posts, res);
};

export const getSinglePostController = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);

  if (!postId) {
    return buildRes(400, "No post id specified", res);
  }

  const validatedPost = await validatePostInfo(postId);

  if (!validatedPost.exists) {
    return buildRes(404, "Post not found", res);
  }

  return buildRes(200, validatedPost.post!, res);
};
