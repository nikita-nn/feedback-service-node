import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  avatar: varchar("avatar").notNull(), // link to avatar ( https://..../avatar.png )
  createdAt: timestamp("created_at").notNull().defaultNow(), // ISO Timestamp
});
