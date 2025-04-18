import { z } from "zod";

const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(6, {
    message: "Password must be at least 3 characters",
  });

export default passwordSchema;
