import LoginForm from "@/app/login/form";
import { FIREBASE_FUNCTIONS_DOMAIN } from "@/constants";
import { User } from "@/types";

export async function registerNewUserWithPassword(user: User): Promise<Response> {
  return fetch(`${FIREBASE_FUNCTIONS_DOMAIN}/authenticateWithPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
