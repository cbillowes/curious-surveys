import * as logger from "firebase-functions/logger";
import { Auth, FirebaseAuthError } from "firebase-admin/auth";
import { Firestore } from "firebase-admin/firestore";
import { Response } from "firebase-functions/v1";
import userRepository, { User } from ".";
import { ZodValidationError } from "../errors";

export const createUserWithPassword = async (
  auth: Auth,
  db: Firestore,
  response: Response<unknown, Record<string, unknown>>,
  user: User
): Promise<void> => {
  try {
    logger.info("Creating new user.");
    await userRepository.createNew(auth, db, user);
    logger.info("User created successfully.");
    response.status(200).send({ message: "User created successfully." });
    return;
  } catch (error: unknown) {
    logger.error("Failed to create new user:", error);
    if (error instanceof ZodValidationError) {
      response.status(400).send({ message: error.message });
      return;
    }
    if (error instanceof FirebaseAuthError) {
      response.status(400).send({ message: error.message });
      return;
    }
    response.status(500).send(error);
    return;
  }
};
