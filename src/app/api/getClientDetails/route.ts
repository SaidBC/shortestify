import { ipAddress } from "@vercel/edge";

export const config = { runtime: "edge" };

export function GET(request: Request) {
  const clientIP = ipAddress(request) || "Unknown";
  return Response.json({
    success: true,
    data: {
      ip: clientIP,
    },
  });
}
