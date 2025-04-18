import { NextApiRequest } from "next";

export function GET(req: NextApiRequest) {
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
