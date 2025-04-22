import prisma from "@/lib/prisma";
import clientEnv from "@/utils/clientEnv";
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
    const user = await prisma.user.findUnique({
      where: {
        id: userToken.id,
      },
      select: {
        balance: true,
      },
    });
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userToken.id,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 60 * 1000),
        },
      },
    });
    const dailyChange = transactions.reduce(
      (f, s) => f + s.amount.toNumber(),
      0
    );
    if (!user)
      return Response.json({
        success: false,
        errors: {
          request: ["User not exists"],
        },
      });
    return Response.json({
      success: true,
      data: {
        balance: Number(user.balance),
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
