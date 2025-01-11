import { Request, Response } from "express";
import { buildRes } from "../../service/system/buildRes";
import { validatePostInfo } from "../../service/posts/postsService";
import { db } from "../../db/db";
import { Votes } from "../../db/schema/votesSchema";
import { validateUniqueVote } from "../../service/votes/votesService";

export const votePostController = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);

  if (!postId) {
    return buildRes(400, "No post id specified", res);
  }

  const validatedPost = await validatePostInfo(postId);

  if (!validatedPost.exists) {
    return buildRes(404, "Post does not exist", res);
  }
  const validateVoteResult = await validateUniqueVote(req.user.id!, postId);

  if (validateVoteResult) {
    await db.insert(Votes).values({ postId: postId, userId: req.user.id });
    return buildRes(200, "Post successfully voted", res);
  } else {
    return buildRes(400, "You already voted this", res);
  }
};
