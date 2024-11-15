"use strict";
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
exports.createNewUser = void 0;
const zod_1 = require("zod");
const collectionPath = "users";
const schema = zod_1.z.object({
    fullName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const validateUserProfile = (userProfile) => {
    try {
        schema.parse(userProfile);
        return true;
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            throw new Error(`Invalid user profile: ${error.errors}`);
        }
        return false;
    }
};
const createNewUser = (auth, db, user) => __awaiter(void 0, void 0, void 0, function* () {
    validateUserProfile(user);
    const record = yield auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.fullName,
    });
    yield db
        .collection(collectionPath)
        .doc(record.uid)
        .set(Object.assign(Object.assign({}, user), { uid: record.uid, created: new Date().toISOString() }));
    return;
});
exports.createNewUser = createNewUser;
