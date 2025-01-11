import { faker } from "@faker-js/faker";
import { Posts } from "../../db/schema/postsSchema";
import { db } from "../../db/db";
import logMessage from "../system/logger";

export const generateMockPosts = async (count: number) => {
  for (let i = 0; i < count; i++) {
    await db.insert(Posts).values({
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      author_id: 1,
    });
  }
  logMessage(`Generated ${count} posts`, "info", "SERVICE");
};
