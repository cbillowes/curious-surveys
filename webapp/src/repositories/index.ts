import { NEXT_PUBLIC_FIREBASE_FUNCTIONS_DOMAIN } from "@/constants";

const DOMAIN = NEXT_PUBLIC_FIREBASE_FUNCTIONS_DOMAIN;

export const POST = async (url: string, data: unknown) => {
  const apiEndpoint = `${DOMAIN}/${url}`;
  console.log(">>>>> ", apiEndpoint)
  const response = await fetch(apiEndpoint.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};
