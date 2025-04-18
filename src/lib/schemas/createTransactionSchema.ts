import { z } from "zod";

const createTransactionSchema = z.object({
  userId: z.string({ message: "User Id must be string" }),
  amount: z
    .number({ message: "Amount must be number" })
    .positive({ message: "Amount must be positive" }),
  type: z.enum(["CLICK", "WITHDRAW"], {
    message: "Type must be withdraw or credit",
  }),
});

export default createTransactionSchema;
