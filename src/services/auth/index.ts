"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const productionUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

console.log(productionUrl);

export const logOutFromServer = async () => {
  (await cookies()).delete("refreshToken");
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("refreshToken")?.value;

  let decodedToken = null;

  if (token) {
    decodedToken = await jwtDecode(token);

    return {
      role: decodedToken.role,
      email: decodedToken.email,
    };
  }

  return decodedToken;
};

export const loginHandler = async (userInfo: any) => {
  const res = await fetch(`${productionUrl}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",

    body: JSON.stringify(userInfo),
    credentials: "include",
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  console.log({ data });

  await (await cookies()).set("refreshToken", data?.data?.accessToken);

  return data;
};
