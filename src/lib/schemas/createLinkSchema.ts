import { z } from "zod";

const createLinkSchema = z.object({
  url: z
    .string({ message: "Url must be string" })
    .url({ message: "Invalid URL" }),
  userId: z.optional(z.string({ message: "User Id must be string" })),
  shortSlug: z.optional(z.string({ message: "Short Slug must be string" })),
  ads: z.optional(z.coerce.boolean({ message: "Ads must be boolean" })),
});

export default createLinkSchema;
