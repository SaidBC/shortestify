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
    const redirects = await prisma.shortLink.count({
      where: {
        type: "REDIRECT",
        userId: userToken.id,
      },
    });
    const dailyRedirects = await prisma.shortLink.count({
      where: {
        type: "REDIRECT",
        userId: userToken.id,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 60 * 1000),
        },
      },
    });
    const uploads = await prisma.shortLink.count({
      where: {
        type: "UPLOAD",
        userId: userToken.id,
      },
    });
    const dailyUploads = await prisma.shortLink.count({
      where: {
        type: "UPLOAD",
        userId: userToken.id,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 60 * 1000),
        },
      },
    });
    const links = await prisma.shortLink.findMany({
      where: {
        userId: userToken.id,
      },
      select: {
        type: true,
        ads: true,
        shortSlug: true,
        createdAt: true,
        _count: {
          select: {
            clicks: {
              where: {
                completed: true,
              },
            },
          },
        },
      },
    });
    return Response.json({
      success: true,
      data: {
        redirects,
        dailyRedirects,
        uploads,
        dailyUploads,
        links,
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
