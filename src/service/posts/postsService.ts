import { allowedUpdatePostFields } from "../../settings";
import { db } from "../../db/db";
import { Posts } from "../../db/schema/postsSchema";
import { asc, desc, eq, sql } from "drizzle-orm";
import { PostValidationResponse } from "../../types/postsTypes";

export const validateUpdatePostData = (updatePostData: string) => {
  const invalidKeys = Object.keys(updatePostData).filter(
    (key) => !allowedUpdatePostFields.includes(key),
  );
  return invalidKeys.length <= 0;
};

export const validatePostInfo = async (
  postId: number,
): Promise<PostValidationResponse> => {
  const postInfo = await db
    .select()
    .from(Posts)
    .where(eq(Posts.id, postId))
    .then((posts) => posts[0]);

  if (postInfo) {
    return { exists: true, post: postInfo };
  } else {
    return { exists: false, post: null };
  }
};

export const correctlyOrderPosts = (sortBy: string | undefined) => {
  switch (sortBy) {
    case "date":
      return desc(Posts.createdAt);
    case "votes":
      return desc(
        sql<number>`(select count(*) from votes where "postId" = ${Posts.id})`,
      );
    default:
      return asc(Posts.id);
  }
};
