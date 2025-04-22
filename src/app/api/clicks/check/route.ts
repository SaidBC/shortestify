import prisma from "@/lib/prisma";
import clientEnv from "@/utils/clientEnv";
import { File } from "@prisma/client";
import axios from "axios";

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const clickId = url.searchParams.get("clickId");
  if (!clickId)
    return Response.json({
      success: false,
      errors: {
        request: "Click ID is required",
      },
    });
  const click = await prisma.click.findUnique({
    where: {
      id: clickId,
    },
  });
  if (!click)
    return Response.json({
      success: false,
      errors: {
        request: "Click is not intialized",
      },
    });
  if (click.completed) {
    return Response.json({ success: true, data: click });
  }
  if (click.createdAt.getTime() + 30000 < Date.now()) {
    const updatedClick = await prisma.click.update({
      where: {
        id: clickId,
      },
      data: {
        completed: true,
      },
      select: {
        shortLink: {
          select: {
            type: true,
            userId: true,
            redirectURL: true,
            uploadLink: {
              include: {
                files: true,
              },
            },
          },
        },
        amount: true,
      },
    });
    if (updatedClick.shortLink.userId) {
      await axios.post(clientEnv.NEXT_PUBLIC_API_URL + "/transactions", {
        type: "REDIRECT",
        amount: updatedClick.amount.toNumber(),
        userId: updatedClick.shortLink.userId,
      });
    }
    let url = "";
    let files: File[] = [];
    if (updatedClick.shortLink.redirectURL)
      url = updatedClick.shortLink.redirectURL.url;
    if (updatedClick.shortLink.uploadLink)
      files = updatedClick.shortLink.uploadLink.files;
    return Response.json({ success: true, data: url || files });
  }
}
