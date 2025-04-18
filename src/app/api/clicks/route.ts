import prisma from "@/lib/prisma";
import createClickSchema from "@/lib/schemas/createClickSchema";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const ip =
    ("ip" in req && req.ip) ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";
  try {
    const response = await axios(
      `https://www.ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`
    );
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
    const click = await prisma.click.create({
      data,
      include: {
        url: true,
      },
    });
    return Response.json({ success: true, data: click });
  } catch (error) {
    return Response.json({
      success: false,
      data: {
        request: "Something went wrong try again .",
      },
    });
  }
}
