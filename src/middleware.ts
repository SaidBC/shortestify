import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const privateRoutes = [
  "/me/dashboard",
  "/me/create",
  "/me/upload",
  "/me/links",
  "/me/withdraw",
  "/me/settings",
];
const authRoutes = ["/auth/login", "/auth/signup"];

export default async function middleware(req: NextRequest) {
  const user = await auth();
  const path = req.nextUrl.pathname;
  if (privateRoutes.includes(path) && !user)
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  if (authRoutes.includes(path) && user)
    return NextResponse.redirect(new URL("/me/dashboard", req.nextUrl));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
