"use server";
import { cookies } from "next/headers";

export const logOutFromServer = async () => {
  (await cookies()).delete("refreshToken");
};
