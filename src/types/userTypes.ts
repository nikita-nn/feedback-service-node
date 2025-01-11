import { Users } from "../db/schema/usersSchema";

export interface UserTokenData {
  email: string;
  iat: number; // UNIX timestamp
  exp: number; // UNIX timestamp
}

export type UserValidationResponse = {
  exists: boolean;
  user: typeof Users.$inferSelect | null;
};
