import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const registerWithPassword = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
