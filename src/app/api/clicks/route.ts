import prisma from "@/lib/prisma";
import createClickSchema from "@/lib/schemas/createClickSchema";
import clientEnv from "@/utils/clientEnv";
import { NextRequest } from "next/server";
import { ipAddress, COUNTRY_HEADER_NAME } from "@vercel/edge";

export const config = { runtime: "edge" };

export async function POST(req: NextRequest) {
  try {
    const ip =
      clientEnv.NEXT_PUBLIC_NODE_ENV === "development"
        ? "8.8.8.8"
        : ipAddress(req);
    const countryCode =
      clientEnv.NEXT_PUBLIC_NODE_ENV === "development"
        ? "US"
        : req.headers.get(COUNTRY_HEADER_NAME) || "Unknown";
    const { shortSlug } = await req.json();
    const validatedData = createClickSchema.safeParse({
      ip,
      countryCode,
      shortSlug,
    });
    if (!validatedData.success) {
      return Response.json({
        success: false,
        errors: {
          request: validatedData.error.flatten().fieldErrors,
        },
      });
    }
    const { data } = validatedData;
    const country = await prisma.country.findUnique({
      where: {
        code: data.countryCode,
      },
    });
    const click = await prisma.click.create({
      data: {
        amount: country ? Number(country.rate.toNumber() / 1000) : undefined,
        ...data,
      },
      include: {
        shortLink: true,
      },
    });
    return Response.json({ success: true, data: click });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      errors: {
        request: "Something went wrong try again .",
      },
    });
  }
}
