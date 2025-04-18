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
});

export default serverEnv.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});
