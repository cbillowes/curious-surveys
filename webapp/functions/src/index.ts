/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 * Configure your env: https://firebase.google.com/docs/functions/config-env?gen=2nd
 */

import { onRequest } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";

// https://firebase.google.com/docs/functions/config-env?gen=2nd#emulator_support

// Note: Cloud Functions for Firebase (2nd gen) does not provide support for the
// events and triggers described in this guide. Because 1st gen and 2nd gen functions
// can coexist side-by-side in the same source file, you can still develop and deploy this functionality
// together with 2nd gen functions.
// https://firebase.google.com/docs/auth/extend-with-functions
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { createNewUser } from "./users/index.js";
import { ZodValidationError } from "./errors.js";

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

const withOptions = (
  request: functions.Request,
  response: functions.Response<unknown, Record<string, unknown>>,
  { methods, headers }: { methods: string; headers: string }
) => {
  if (request.method === "OPTIONS") {
    response.set(
      "Access-Control-Allow-Origin",
      defineString("WHITELISTED_DOMAINS").value()
    );
    response.set("Access-Control-Allow-Methods", methods);
    response.set("Access-Control-Allow-Headers", headers);
    response.status(204).send("");
  }
};

// http://127.0.0.1:5001/curious-surveys/us-central1/registerUser
export const registerUser = onRequest(async (request, response) => {
  if (request.method === "OPTIONS") {
    return withOptions(request, response, {
      methods: "POST, OPTIONS",
      headers: "Content-Type",
    });
  }
  if (request.method === "POST") {
    try {
      await createNewUser(auth, db, request.body);
      response.send();
      return;
    } catch (error: unknown) {
      if (error instanceof ZodValidationError) {
        logger.error("Failed to create new user:", error.message);
        response.status(400).send(error.message);
        return;
      }
      logger.error("Failed to create new user:", error);
      response.status(500).send("Something went wrong");
      return;
    }
  }
  response.status(405).send("Method Not Allowed");
});

// export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
//   logger.info("Send welcome email to:", user.email);
// });
