import prisma from "@/lib/prisma";
import updateEmailSchema from "@/lib/schemas/updateEmailSchema";
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
    const validatedData = updateEmailSchema.safeParse(body);
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
    });
    if (!user)
      return Response.json({
        success: false,
        errors: {
          request: ["User with provided token not found"],
        },
      });
    const isEmailExists = await prisma.user.findUnique({
      where: {
        email: validatedData.data.email,
      },
    });
    if (isEmailExists)
      return Response.json({
        success: false,
        errors: {
          request: ["Email is already exists"],
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
    await prisma.user.update({
      where: {
        id: userToken.id,
      },
      data: {
        email: validatedData.data.email,
      },
    });
    return Response.json({
      success: true,
      data: null,
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
