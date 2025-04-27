import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  console.log(req);
  return Response.json({ success: true, data: null });
}
