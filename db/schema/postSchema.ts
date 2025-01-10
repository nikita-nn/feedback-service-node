import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { Users } from "./userSchema";

export const CategoryEnum = pgEnum("categoryEnum", [
  "Status",
  "Functional",
  "Bug",
  "UI",
  "Performance",
  "Default",
]);

export const StatusEnum = pgEnum("statusEnum", [
  "Idea",
  "Planned",
  "In work",
  "Completed",
  "Started",
]);

export const Posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  category: CategoryEnum("category").default("Default").notNull(),
  status: StatusEnum("status").default("Started").notNull(),
  author_id: integer("author_id").references(() => Users.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
