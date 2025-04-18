import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const ip =
    ("ip" in req && req.ip) ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";

  const response = await fetch(
    `https://www.ipinfo.io/105.154.35.245?token=5a02c9e17dead4`
  );
  const data = response;
  console.log(ip, data);
  const click = null;
  return Response.json({ success: true, data: click });
}
