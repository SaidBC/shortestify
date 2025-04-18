import { z } from "zod";

const emailSchema = z.string({ required_error: "Email is required" }).email({
  message: "Please enter a valid email address",
});

export default emailSchema;
