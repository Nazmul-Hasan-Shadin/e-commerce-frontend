"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

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
  // https://swift-mart-bd.vercel.app
  // https://independent-shop.vercel.app/api/v1/auth/login
  // http://localhost:3001/
  const res = await fetch(
    "https://independent-shop.vercel.app/api/v1/auth/login",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify(userInfo),
      credentials: "include",
    },
  );

  const data = await res.json();

  console.log({ data });

  await (await cookies()).set("refreshToken", data?.data?.accessToken);

  // const decodedToken = data.data.accessToken;
  // if (data?.data?.accessToken) {
  //   return {
  //     email: decodedToken.email,
  //     role: decodedToken.role,
  //   };
  // }

  return data;
};
