import { Auth } from "firebase-admin/auth";
import { Firestore } from "firebase-admin/firestore";
import { z, ZodError } from "zod";

const collectionPath = "users";

interface User {
  fullName: string;
  email: string;
  password: string;
}

const schema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const validateUserProfile = (userProfile: unknown): boolean => {
  try {
    schema.parse(userProfile);
    return true;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw new Error(`Invalid user profile: ${error.errors}`);
    }
    return false;
  }
};

export const createNewUser = async (
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
