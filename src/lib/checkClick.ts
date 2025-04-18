import { ICheckClickResponse } from "@/types";
import clientEnv from "@/utils/clientEnv";
import axios from "axios";

export default async function checkClick(clickId: string) {
  const res = await axios.patch<ICheckClickResponse>(
    clientEnv.NEXT_PUBLIC_API_URL + "/clicks/check?clickId=" + clickId
  );
  return res.data;
}
