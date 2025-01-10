import { db } from "../../../db/db";
import { Votes } from "../../../db/schema/votesSchema";
import { and, eq } from "drizzle-orm";

export const validateUniqueVote = async (userId: number, postId: number) => {
  const isUniqueVote = await db.$count(
    Votes,
    and(eq(Votes.userId, userId), eq(Votes.postId, postId)),
  );
  return isUniqueVote == 0;
};
