import { z } from "zod";
import usernameSchema from "./usernameSchame";
import emailSchema from "./emailSchema";
import passwordSchema from "./passwordSchema";

const signUpSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
    terms: z.coerce
      .boolean({ required_error: "Terms is required" })
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
  })
  .refine((inputs) => inputs.password === inputs.confirmPassword, {
    message: "Confirm password do not match password",
    path: ["confirmPassword"],
  });

export default signUpSchema;
