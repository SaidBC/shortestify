import { IGetShortlinkResponse } from "@/types";
import clientEnv from "@/utils/clientEnv";
import axios from "axios";

export default async function getShortlinkBySlug(
  slug: string
): Promise<IGetShortlinkResponse> {
  const response = await axios<IGetShortlinkResponse>(
    clientEnv.NEXT_PUBLIC_API_URL + "/shortlinks/" + slug
  );
  const data = response.data;
  return data;
}
