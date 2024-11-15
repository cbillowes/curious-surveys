"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 * Configure your env: https://firebase.google.com/docs/functions/config-env?gen=2nd
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const logger = __importStar(require("firebase-functions/logger"));
const admin = __importStar(require("firebase-admin"));
const index_js_1 = require("./users/index.js");
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();
const withOptions = (request, response, { methods, headers }) => {
    if (request.method === "OPTIONS") {
        response.set("Access-Control-Allow-Origin", (0, params_1.defineString)("WHITELISTED_DOMAINS").value());
        response.set("Access-Control-Allow-Methods", methods);
        response.set("Access-Control-Allow-Headers", headers);
        response.status(204).send("");
    }
};
// http://127.0.0.1:5001/curious-surveys/us-central1/registerUser
exports.registerUser = (0, https_1.onRequest)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.method === "OPTIONS") {
        return withOptions(request, response, {
            methods: "POST, OPTIONS",
            headers: "Content-Type",
        });
    }
    if (request.method === "POST") {
        try {
            yield (0, index_js_1.createNewUser)(auth, db, request.body);
            response.send();
            return;
        }
        catch (error) {
            logger.error("Failed to create new user:", error);
            response.status(400).send("Failed to create new user");
            return;
        }
    }
    response.status(405).send("Method Not Allowed");
}));
// export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
//   logger.info("Send welcome email to:", user.email);
// });
