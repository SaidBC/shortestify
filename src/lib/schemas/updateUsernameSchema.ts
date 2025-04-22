import { z } from "zod";
import usernameSchema from "./usernameSchame";

const updateUsernameSchema = z.object({
  username: usernameSchema,
});

export default updateUsernameSchema;
