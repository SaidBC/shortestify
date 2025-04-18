import { IClickResponse } from "@/types";
import clientEnv from "@/utils/clientEnv";
import axios from "axios";

export default async function initializeClick(shortSlug: string) {
  const res = await axios.post<IClickResponse>(
    clientEnv.NEXT_PUBLIC_API_URL + "/clicks",
    {
      shortSlug,
    }
  );
  return res.data;
}
