import { db } from "../../../db/db";
import { Users } from "../../../db/schema/userSchema";
import { eq } from "drizzle-orm";
import CryptoJS from "crypto-js";

export const checkExistingUser = async (
  email: string,
): Promise<{ exists: boolean; user: typeof Users.$inferSelect | null }> => {
  const userObj = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email))
    .then((users) => users[0]);
  return { exists: !!userObj, user: userObj || null };
};

export const hashPassword = (password: string) =>
  CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64);
