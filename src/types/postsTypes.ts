import { Posts } from "../../db/schema/postSchema";

export type PostValidationResponse = {
  exists: boolean;
  post: typeof Posts.$inferSelect | null;
};
