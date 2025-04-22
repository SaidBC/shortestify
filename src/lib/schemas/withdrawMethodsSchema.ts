import { z } from "zod";

const WITHDRAW_METHODS = ["PAYEER", "USDT", "PAYPAL", "PERFECTMONEY"] as const;
const withdrawMethodsSchema = z.enum(WITHDRAW_METHODS, {
  message: "Invalid withdraw method",
});

export default withdrawMethodsSchema;
