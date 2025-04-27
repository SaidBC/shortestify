import { z } from "zod";

const serverEnv = z.object({
  DATABASE_URL: z
    .string()
    .refine(
      (val) => val.startsWith("postgresql://") || val.startsWith("postgres://"),
      {
        message: 'String must start with "postgresql://" or "postgres://"',
      }
    ),
  NEXTAUTH_SECRET: z.string({
    message: "NEXTAUTH_SECRET must be set",
  }),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
});

export default serverEnv.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
});
