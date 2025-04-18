import { z } from "zod";

const createClickSchema = z.object({
  shortSlug: z.string(),
  ip: z.string(),
  countryCode: z.string(),
});

export default createClickSchema;
