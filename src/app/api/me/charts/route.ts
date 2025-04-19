import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl);
    const type = url.searchParams.get("type");
    if (type !== "CLICK")
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
        type,
        createdAt: {
          gte: new Date(date.setDate(date.getDate() - days)),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      data: transactions,
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
