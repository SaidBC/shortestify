import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  try {
  } catch (error) {
    return Response.json({
      success: false,
      data: {
        request: "Something went wrong try again .",
      },
    });
  }
}
