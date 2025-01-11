import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { Users } from "./usersSchema";
import { currentCategories, currentStatuses } from "../../settings";

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
    .references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
