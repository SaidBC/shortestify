import prisma from "@/lib/prisma";
import clientEnv from "@/utils/clientEnv";
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
      include: {
        shortLink: true,
      },
    });
    if (updatedClick.shortLink.userId) {
      await axios.post(clientEnv.NEXT_PUBLIC_API_URL + "/transactions", {
        type: "CLICK",
        amount: updatedClick.amount,
        userId: updatedClick.shortLink.userId,
      });
    }
    return Response.json({ success: true, data: updatedClick });
  }
}
