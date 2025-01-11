import { Posts } from "../db/schema/postsSchema";

export type PostValidationResponse = {
  exists: boolean;
  post: typeof Posts.$inferSelect | null;
};

export type SortByType = "date" | "votes" | undefined;
