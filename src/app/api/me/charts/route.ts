import prisma from "@/lib/prisma";
import clientEnv from "@/utils/clientEnv";
import lastPeriodData from "@/utils/lastPeriodData";
import serverEnv from "@/utils/serverEnv";
import { TransactionType } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const transactionTypes: TransactionType[] = ["UPLOAD", "REDIRECT"];

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
    const url = new URL(req.nextUrl);
    const typesParams = url.searchParams.get("type")?.split(",");
    if (
      !typesParams?.every((item): item is TransactionType =>
        transactionTypes.some((transactionType) => transactionType === item)
      )
    )
      return Response.json({
        succes: false,
        errors: {
          type: ["Invalid transaction type"],
        },
      });
    const range = url.searchParams.get("range");
    const days = (range && +range) || 30;
    const date = new Date();
    const transactions = await prisma.transaction.findMany({
      where: {
        type: {
          in: typesParams,
        },
        userId: userToken.id,
        createdAt: {
          gte: new Date(date.setDate(date.getDate() - days)),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const data = lastPeriodData(transactions);

    return Response.json({
      success: true,
      data,
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
