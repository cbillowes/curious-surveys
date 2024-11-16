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

// https://firebase.google.com/docs/functions/config-env?gen=2nd#emulator_support

// Note: Cloud Functions for Firebase (2nd gen) does not provide support for the
// events and triggers described in this guide. Because 1st gen and 2nd gen functions
// can coexist side-by-side in the same source file, you can still develop and deploy this functionality
// together with 2nd gen functions.
// https://firebase.google.com/docs/auth/extend-with-functions
import { Request, Response } from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { createNewUser } from "./api.js";

const whitelisting = defineString("WHITELISTED_DOMAINS");

admin.initializeApp();

const withOptions = (
  request: Request,
  response: Response<unknown, Record<string, unknown>>,
  { methods, headers }: { methods: string; headers: string },
  next: (
    request: Request,
    response: Response<unknown, Record<string, unknown>>
  ) => void
) => {
  if (request.method === "OPTIONS") {
    response.set("Access-Control-Allow-Origin", whitelisting.value());
    response.set("Access-Control-Allow-Methods", methods);
    response.set("Access-Control-Allow-Headers", headers);
    response.status(204).send("");
  }
  next(request, response);
};

// http://127.0.0.1:5001/curious-surveys/us-central1/registerUser
export const registerUser = onRequest(async (request, response) => {
  withOptions(
    request,
    response,
    { methods: "POST, OPTIONS", headers: "Content-Type" },
    createNewUser(admin.auth(), admin.firestore())
  );
});

// export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
//   logger.info("Send welcome email to:", user.email);
// });
