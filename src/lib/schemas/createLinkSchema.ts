import { z } from "zod";

const createLinkSchema = z.object({
  url: z
    .string({ message: "Url must be string" })
    .url({ message: "Invalid URL" }),
  shortSlug: z.optional(z.string({ message: "Short Slug must be string" })),
  ads: z.optional(z.enum(["yes", "no"], { message: "Ads must be yes or no" })),
});

export default createLinkSchema;
