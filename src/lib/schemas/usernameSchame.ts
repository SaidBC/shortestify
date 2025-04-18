import { z } from "zod";

const usernameSchema = z
  .string({ required_error: "Username is required" })
  .min(3, {
    message: "Username must be at least 3 characters",
  });

export default usernameSchema;
