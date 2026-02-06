import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getCurrentUser } from "./services/auth";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/],
  vendor: [/^\/vendor/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser(); //role and email

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow access to login/register
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url),
      ); // Redirect to login, with original path as redirect URL
    }
  }

  // If the user is authenticated, check role-based access
  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];

    console.log("Role matched", routes);

    // Check if the current route matches the user's role-based route
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// Matching paths for middleware
export const config = {
  matcher: [
    // "/user/:page*",
    // "/admin/:page*",
    // "/vendor/:page*",
    // "/login",
    // "/register",
  ],
};
