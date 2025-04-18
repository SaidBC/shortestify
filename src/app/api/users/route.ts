import prisma from "@/lib/prisma";
import createUserSchema from "@/lib/schemas/createUserSchema";
import hashPassword from "@/utils/hashPassword";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createUserSchema.safeParse(body);
    if (!validatedData.success) return Response.json(validatedData);
    const { data } = validatedData;
    const isEmailExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (isEmailExists)
      return Response.json({
        success: false,
        error: {
          email: ["Email already exists"],
        },
      });
    const isUsernameExists = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (isUsernameExists)
      return Response.json({
        success: false,
        error: {
          email: ["Email already exists"],
        },
      });
    data.password = await hashPassword(data.password);
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
      },
    });
    return Response.json({ success: true, data: user });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
