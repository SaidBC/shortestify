import prisma from "@/lib/prisma";
import clientEnv from "@/utils/clientEnv";
import daily24hChange from "@/utils/daily24hChange";
import serverEnv from "@/utils/serverEnv";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userToken = await getToken({
      req,
      secureCookie: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
      secret: serverEnv.NEXTAUTH_SECRET,
    });
    if (!userToken)
      return Response.json({
        success: false,
        errors: {
          request: ["Token not provided"],
        },
      });
    const lastDayDownloadsCount = await prisma.click.count({
      where: {
        shortLink: {
          userId: userToken.id,
          type: "UPLOAD",
        },
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 60 * 1000),
        },
        completed: true,
      },
    });
    const yesterdayDownloadsCount = await prisma.click.count({
      where: {
        shortLink: {
          userId: userToken.id,
          type: "UPLOAD",
        },
        createdAt: {
          gte: new Date(Date.now() - 48 * 60 * 60 * 60 * 1000),
          lte: new Date(Date.now() - 24 * 60 * 60 * 60 * 1000),
        },
        completed: true,
      },
    });
    const dailyChange = daily24hChange(
      lastDayDownloadsCount,
      yesterdayDownloadsCount
    );
    return Response.json({
      success: true,
      data: {
        downloads: lastDayDownloadsCount,
        dailyChange,
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
