import prisma from "@/lib/prisma";
import createTransactionSchema from "@/lib/schemas/createTransactionSchema";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const where: Prisma.TransactionWhereInput = {};
    const searchParams = new URL(req.url).searchParams;

    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (id) where.id = Number(id);
    if (userId) where.userId = userId;

    const transactions = await prisma.transaction.findMany({ where });
    return Response.json({ success: true, data: transactions });
  } catch (error) {
    return Response.json({
      success: false,
      errors: {
        request: ["Something went wrong try again ."],
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createTransactionSchema.safeParse(body);

    if (!validatedData.success) {
      return Response.json({
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
      });
    }
    const { data } = validatedData;
    const transaction = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: data.userId,
          amount: data.amount,
          type: data.type,
        },
      }),
      prisma.user.update({
        where: { id: data.userId },
        data: {
          balance:
            data.type !== "WITHDRAW"
              ? { increment: data.amount }
              : { decrement: data.amount },
        },
      }),
    ]);
    return Response.json({ success: true, data: transaction });
  } catch (error) {
    return Response.json({
      success: false,
      errors: {
        request: ["Something went wrong try again ."],
      },
    });
  }
}
