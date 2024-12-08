import { jwtDecode } from "jwt-decode";

export const verifyToken = (
  token: string
): Promise<{
  email: string;
  role: string;
  iat: number;
  exp: number;
}> => {
  return jwtDecode(token);
};
