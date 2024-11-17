import * as logger from "firebase-functions/logger";
import { Auth } from "firebase-admin/auth";
import { Firestore } from "firebase-admin/firestore";
import { Request, Response } from "firebase-functions/v1";
import { createUserWithPassword } from "./users/api";
import { User } from "./users";

export const manageUserWithPassword =
  (auth: Auth, db: Firestore) =>
  async (
    request: Request,
    response: Response<unknown, Record<string, unknown>>
  ): Promise<void> => {
    if (request.method === "POST") {
      createUserWithPassword(auth, db, response, request.body as User);
    } else {
      logger.warn(`Method not allowed: ${request.method}`);
      response.status(405).send({ message: "Method not allowed." });
      return;
    }
  };
