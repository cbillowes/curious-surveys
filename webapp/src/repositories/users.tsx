import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

interface Profile {
  fullName: string;
}

export const saveUserProfile = async (userId: string, profile: Profile) => {
  try {
    await setDoc(doc(db, "users", userId), profile);
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Failed to save user profile.");
  }
};

export const registerWithPassword = async (
  email: string,
  password: string,
  profile: Profile
) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await saveUserProfile(credential.user.uid, profile);
    return { success: true, uid: credential.user.uid };
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Failed to register user with password.");
  }
};
