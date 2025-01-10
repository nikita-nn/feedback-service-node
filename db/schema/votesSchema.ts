import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { Posts } from "./postSchema";
import { Users } from "./userSchema";

export const Votes = pgTable("votes", {
  id: serial("id"),
  postId: integer("postId").references(() => Posts.id),
  userId: integer("userId").references(() => Users.id),
});
