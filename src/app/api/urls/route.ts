import prisma from "@/lib/prisma";
import createLinkSchema from "@/lib/schemas/createLinkSchema";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

type PrismaCreateShortLinkData =
  | (Prisma.Without<
      Prisma.ShortLinkCreateInput,
      Prisma.ShortLinkUncheckedCreateInput
    > &
      Prisma.ShortLinkUncheckedCreateInput)
  | (Prisma.Without<
      Prisma.ShortLinkUncheckedCreateInput,
      Prisma.ShortLinkCreateInput
    > &
      Prisma.ShortLinkCreateInput);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createLinkSchema.safeParse(body);
    if (!validatedData.success) {
      return Response.json({
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
      });
    }
    const url = validatedData.data.url;
    const redirectedUrl = await prisma.redirectLink.create({
      data: { url },
    });
    const data: PrismaCreateShortLinkData = {
      urlId: redirectedUrl.id,
      type: "REDIRECT",
    };
    if (validatedData.data.userId) data.userId = validatedData.data.userId;
    const link = await prisma.shortLink.create({ data });
    return Response.json({ success: true, data: link });
  } catch (error) {
    return Response.json({
      success: false,
      errors: {
        request: "Something went wrong try again .",
      },
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const where: Prisma.ShortLinkWhereInput = {};
    const searchParams = new URL(req.url).searchParams;
    const shortSlug = searchParams.get("shortSlug");
    const userId = searchParams.get("userId");
    if (shortSlug) where.shortSlug = shortSlug;
    if (userId) where.userId = userId;
    const data = await prisma.shortLink.findMany({ where });
    return Response.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      data: {
        request: "Something went wrong try again .",
      },
    });
  }
}
