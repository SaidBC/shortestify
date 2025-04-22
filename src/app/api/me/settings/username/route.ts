import prisma from "@/lib/prisma";
import updateUsernameSchema from "@/lib/schemas/updateUsernameSchema";
import clientEnv from "@/utils/clientEnv";
import serverEnv from "@/utils/serverEnv";
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
    const validatedData = updateUsernameSchema.safeParse(body);
    console.log(body, validatedData);

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
    const isUsernameExists = await prisma.user.findUnique({
      where: {
        username: validatedData.data.username,
      },
    });
    if (isUsernameExists)
      return Response.json({
        success: false,
        errors: {
          request: ["Username is already exists"],
        },
      });
    await prisma.user.update({
      where: {
        id: userToken.id,
      },
      data: {
        username: validatedData.data.username,
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
