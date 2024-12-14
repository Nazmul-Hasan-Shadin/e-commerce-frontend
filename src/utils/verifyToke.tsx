import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  return jwtDecode(token);
};

// Promise<{
//   email: string;
//   role: string;
//   iat: number;
//   exp: number;
// }
