import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { Posts } from "./postsSchema";
import { Users } from "./usersSchema";

export const Votes = pgTable("votes", {
  id: serial("id"),
  postId: integer("postId").references(() => Posts.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  userId: integer("userId").references(() => Users.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});
