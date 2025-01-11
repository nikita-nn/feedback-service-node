import { db } from "../../db/db";
import { Users } from "../../db/schema/usersSchema";
import { eq } from "drizzle-orm";
import CryptoJS from "crypto-js";
import { UserTokenData, UserValidationResponse } from "../../types/userTypes";
import jwt from "jsonwebtoken";

export const checkExistingUser = async (
  email: string,
): Promise<UserValidationResponse> => {
  const userObj = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email))
    .then((users) => users[0]);
  return { exists: !!userObj, user: userObj || null };
};

export const hashPassword = (password: string) =>
  CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64);

export const checkJWTPayload = async (
  token: string,
): Promise<{ status: boolean; data: typeof Users.$inferSelect | null }> => {
  let decodedData: UserTokenData | null = null;

  try {
    decodedData = jwt.verify(
      token,
      String(process.env.JWT_SECRET),
    ) as UserTokenData;
  } catch (e) {
    return { status: false, data: null };
  }

  if (!decodedData) {
    return { status: false, data: null };
  }

  const userData = await checkExistingUser(decodedData.email);

  const now = Date.now() / 1000; // JWT exp and iss is in seconds

  if (decodedData.exp < now || decodedData.iat > now || !userData.exists) {
    return { status: false, data: null };
  }

  return { status: true, data: userData.user };
};
