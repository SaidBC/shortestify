import { z } from "zod";
import passwordSchema from "./passwordSchema";
import withdrawMethodsSchema from "./withdrawMethodsSchema";

const withdrawSchema = z.object({
  method: withdrawMethodsSchema,
  to: z.string().nonempty({ message: "Receiver account must not be empty" }),
  amount: z.coerce.number({ message: "amount in not a number" }),
  password: passwordSchema,
});

export default withdrawSchema;
