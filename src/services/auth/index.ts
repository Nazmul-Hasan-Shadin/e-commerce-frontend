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
  try {
    const res = await fetch(`${productionUrl}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify(userInfo),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data, "iam data");
    if (!res.ok || !data.success) {
      // Return the error instead of throwing it
      return {
        success: false,
        message: data?.message || "Login failed",
      };
    }

    console.log('iam hit');
    

    await (await cookies()).set("refreshToken", data?.data?.accessToken);

    return data;
  } catch (error) {
    console.error("Login Action Error:", error);
    
  }
};
