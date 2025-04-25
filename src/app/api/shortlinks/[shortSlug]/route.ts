import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const shortSlug = req.nextUrl.pathname.split("/").at(-1);
    const shortlink = await prisma.shortLink.findUnique({
      where: {
        shortSlug: shortSlug,
      },
    });
    return Response.json({
      success: true,
      data: shortlink,
    });
  } catch (error) {
    return Response.json({
      success: false,
      data: {
        request: "Something went wrong try again .",
      },
    });
  }
}
