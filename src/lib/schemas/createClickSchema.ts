import { z } from "zod";

const createClickSchema = z.object({
  shortSlug: z.string(),
  ip: z.string().ip({ message: "IP must be a valid IP address" }),
  countryCode: z
    .string()
    .length(2, { message: "Country code must be 2 characters only" }),
});

export default createClickSchema;
