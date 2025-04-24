import prisma from "@/lib/prisma";
import createClickSchema from "@/lib/schemas/createClickSchema";
import clientEnv from "@/utils/clientEnv";
import axios from "axios";
import { NextRequest } from "next/server";
import { ipAddress } from "@vercel/edge";
export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest) {
  const ip =
    clientEnv.NEXT_PUBLIC_NODE_ENV === "development"
      ? "8.8.8.8"
      : ("ip" in req && req.ip) ||
        req.headers.get("x-real-ip") ||
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        "unknown";
  try {
    const response = await axios(
      `https://www.ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`
    );
    ipAddress;
    console.log(ipAddress(req));

    const countryCode = response.data.country || "unknown";
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
