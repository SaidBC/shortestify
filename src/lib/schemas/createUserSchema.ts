import { z } from "zod";

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default createUserSchema;
