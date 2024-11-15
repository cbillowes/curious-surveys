import { POST } from "@/repositories";

interface User {
  fullName: string;
  email: string;
  password: string;
}

export const registerWithPassword = async ({
  email,
  password,
  fullName,
}: User) => {
  await POST("/register", {
    email,
    password,
    fullName,
  });
};
