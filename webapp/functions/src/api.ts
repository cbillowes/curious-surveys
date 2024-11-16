import * as logger from "firebase-functions/logger";
import { Auth } from "firebase-admin/auth";
import { Firestore } from "firebase-admin/firestore";
import { ZodValidationError } from "./errors";
import { Request, Response } from "firebase-functions/v1";
import userRepository, { User } from "./users";

export const createNewUser =
  (auth: Auth, db: Firestore) =>
  async (
    request: Request,
    response: Response<unknown, Record<string, unknown>>
  ): Promise<void> => {
    if (request.method === "POST") {
      try {
        await userRepository.createNew(auth, db, request.body as User);
        response.send();
      } catch (error: unknown) {
        if (error instanceof ZodValidationError) {
          logger.error("Failed to create new user:", error.message);
          response.status(400).send(error.message);
        }
        logger.error("Failed to create new user:", error);
        response.status(500).send("Something went wrong");
      }
    } else {
      response.status(405).send("Method Not Allowed");
    }
  };
