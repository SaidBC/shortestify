import axios from "axios";
import clientEnv from "./clientEnv";

export default async function globalFetcher(arg: string) {
  const axiosFetcher = axios.create({
    baseURL: clientEnv.NEXT_PUBLIC_API_URL,
    timeout: 10000,
  });
  try {
    const response = await axiosFetcher.get(arg);
    return response.data;
  } catch (err) {
    throw err;
  }
}
