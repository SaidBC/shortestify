import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import getShortlinkBySlug from "./lib/getShortlinkBySlug";

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
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/ads")) {
    const shortSlug = pathname.split("/").at(-1);
    if (!shortSlug) return NextResponse.redirect(new URL("/404", req.nextUrl));
    const response = await getShortlinkBySlug(shortSlug);
    if (!response.success) return;
    if (!response.data)
      return NextResponse.redirect(new URL("/404", req.nextUrl));
  }
  const user = await auth();
  const path = req.nextUrl.pathname;
  if (privateRoutes.includes(path) && !user)
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  if (authRoutes.includes(path) && user)
    return NextResponse.redirect(new URL("/me/dashboard", req.nextUrl));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
