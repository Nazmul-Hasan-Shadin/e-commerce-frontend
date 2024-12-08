import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/verifyToke";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/],
  vendor: [/^\/vendor/],
};

// Middleware to check authentication and role
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  const token = request.cookies.get("refreshToken")?.value;

  if (!token) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  const user = await verifyToken(token);
  console.log(user);

  if (!user) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // Check the role-based route access
  if (user.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];
    console.log(routes, "role routes");
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// Utility function to get user from token (this can be replaced with a real API call)
async function getCurrentUserFromToken(token: string) {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data; // assuming it returns the user object with a role
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/profile/:page*", "/admin", "/login"],
};
