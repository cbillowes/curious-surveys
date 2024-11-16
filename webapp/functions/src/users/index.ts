import { Auth } from "firebase-admin/auth";
import { Firestore } from "firebase-admin/firestore";
import { z, ZodError } from "zod";
import { ZodValidationError } from "../errors";

const collectionPath = "users";

export interface User {
  fullName: string;
  email: string;
  password: string;
}

const schema = z.object({
  fullName: z.string({
    required_error: "Full name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z.string({
    required_error: "Password is required",
  }),
});

const validateUserProfile = (userProfile: unknown): boolean => {
  try {
    schema.parse(userProfile);
    return true;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw new ZodValidationError("Invalid profile", error.errors);
    }
    return false;
  }
};

const createNew = async (
  auth: Auth,
  db: Firestore,
  user: User
): Promise<undefined> => {
  validateUserProfile(user);
  const record = await auth.createUser({
    email: user.email,
    password: user.password,
    displayName: user.fullName,
  });
  await db
    .collection(collectionPath)
    .doc(record.uid)
    .set({
      ...user,
      uid: record.uid,
      created: new Date().toISOString(),
    });
  return;
};

export default {
  createNew,
};
