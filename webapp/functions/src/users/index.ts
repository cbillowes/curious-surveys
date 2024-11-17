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

// REMARK:
// Type inference is making all my fields optional so I'm forcing them with a min x value.
// https://github.com/colinhacks/zod/issues/43
const schema = z.object({
  fullName: z.string().min(1, {
    message: "Full name is required",
  }),
  email: z.string().min(1).email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(50, {
      message: "Password must be at most 50 characters",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one digit",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

const validateUserProfile = (userProfile: unknown): boolean => {
  try {
    schema.parse(userProfile);
    return true;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw new ZodValidationError(
        "Missing or invalid fields for user",
        error.errors
      );
    }
    return false;
  }
};

const createNew = async (
  auth: Auth,
  db: Firestore,
  user: User
): Promise<void> => {
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
};

export default {
  createNew,
};
