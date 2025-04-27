import { NextRequest } from "next/server";
import { auth } from "./auth";
import getShortlinkBySlug from "./lib/getShortlinkBySlug";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { RateLimiterRedis } from "rate-limiter-flexible";

const privateRoutes = [
  "/me/dashboard",
  "/me/create",
  "/me/upload",
  "/me/links",
  "/me/withdraw",
  "/me/settings",
];
const authRoutes = ["/auth/login", "/auth/signup"];
const redis = Redis.fromEnv();
const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 10,
  duration: 60,
  keyPrefix: "api-rate-limit",
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api")) {
    const ip =
      req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
    if (!ip)
      return Response.json({
        success: false,
        errors: {
          request: ["IP not found"],
        },
      });
    try {
      await rateLimiter.consume(ip);
    } catch (error) {
      return Response.json({
        success: false,
        errors: {
          request: ["Too many requests"],
        },
      });
    }
  }
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
