import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  try {
    const userId = "11";
    const clicks = prisma.click.findMany({
      where: {
        shortLink: {
          userId,
        },
      },
    });
  } catch (error) {
    return Response.json({
      success: false,
      errors: {
        request: ["Something went wrong"],
      },
    });
  }
}
