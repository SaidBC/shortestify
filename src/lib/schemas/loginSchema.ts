import { z } from "zod";
import usernameSchema from "./usernameSchame";
import passwordSchema from "./passwordSchema";

const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export default loginSchema;
