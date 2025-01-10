import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { Users } from "./userSchema";
import { currentCategories, currentStatuses } from "../../src/settings";

export const CategoryEnum = pgEnum(
  "categoryEnum",
  currentCategories as [string, ...string[]],
);

export const StatusEnum = pgEnum(
  "statusEnum",
  currentStatuses as [string, ...string[]],
);

export const Posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  category: CategoryEnum("category"),
  status: StatusEnum("status"),
  author_id: integer("author_id")
    .references(() => Users.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
