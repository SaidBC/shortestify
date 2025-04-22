import { z } from "zod";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";

const updateEmailSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export default updateEmailSchema;
