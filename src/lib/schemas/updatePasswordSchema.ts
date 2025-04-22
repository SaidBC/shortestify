import { z } from "zod";
import passwordSchema from "./passwordSchema";

const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((inputs) => inputs.newPassword === inputs.confirmPassword, {
    message: "Confirm password do not match password",
    path: ["confirmPassword"],
  })
  .refine((inputs) => inputs.password !== inputs.newPassword, {
    message: "new password must'nt be equal to current password",
    path: ["newPassword"],
  });

export default updatePasswordSchema;
