import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IUserBalanceResponse } from "@/types";
import clientEnv from "@/utils/clientEnv";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

axios.defaults.baseURL = clientEnv.NEXT_PUBLIC_API_URL;
export default async function BalanceCard() {
  const token = await getToken({
    secureCookie: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
    raw: true,
    req: {
      headers: await headers(),
    },
  });
  const res = await axios.get<IUserBalanceResponse>("/me/balance", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = res.data;
  if (!data.success) return <>Something went wrongs</>;
  const balance = data.data.balance;
  const dailyChange = data.data.dailyChange;
  return (
    <Card className="bg-slate-900 max-w-md mx-auto w-full rounded-none border-t-4 border-green-600 border-b-0 border-x-0">
      <CardContent className="flex flex-col">
        <div className="flex justify-center gap-2 py-6">
          <span className="font-bold text-center text-6xl text-white">
            ${balance}
          </span>
          <span className="text-green-400 font-bold text-xl">
            +${dailyChange.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-white font-bold text-center w-full text-xl">
          Total Balance
        </span>
      </CardFooter>
    </Card>
  );
}
