import { z } from "zod";

const clientEnv = z.object({
  NEXT_PUBLIC_ORIGIN_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_ADS_URL: z.string().url(),
  NEXT_PUBLIC_NOADS_URL: z.string().url(),
});

export default clientEnv.parse({
  NEXT_PUBLIC_ORIGIN_URL: process.env.NEXT_PUBLIC_ORIGIN_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ADS_URL: process.env.NEXT_PUBLIC_ADS_URL,
  NEXT_PUBLIC_NOADS_URL: process.env.NEXT_PUBLIC_NOADS_URL,
});
