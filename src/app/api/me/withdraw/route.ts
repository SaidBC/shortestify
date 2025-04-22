import prisma from "@/lib/prisma";
import withdrawSchema from "@/lib/schemas/withdrawSchema";
import clientEnv from "@/utils/clientEnv";
import serverEnv from "@/utils/serverEnv";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const validatedData = withdrawSchema.safeParse(body);
    if (!validatedData.success) {
      return Response.json({
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userToken.id,
      },
      select: {
        balance: true,
        password: true,
      },
    });
    if (!user)
      return Response.json({
        success: false,
        errors: {
          request: ["User not exists"],
        },
      });
    if (user.balance.toNumber() < 1)
      return Response.json({
        success: false,
        errors: {
          request: [
            "Minimum withdraw is $1 and your balance is $" + user.balance,
          ],
        },
      });
    const isMatch = await bcrypt.compare(
      validatedData.data.password,
      user.password
    );
    if (!isMatch)
      return Response.json({
        success: false,
        errors: {
          password: ["Invalid user password"],
        },
      });
    const withdraw = await prisma.withdrawal.create({
      data: {
        amount: validatedData.data.amount,
        to: validatedData.data.to,
        userId: userToken.id,
        method: validatedData.data.method,
        status: "PENDING",
      },
    });

    return Response.json({
      successs: true,
      data: withdraw,
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
