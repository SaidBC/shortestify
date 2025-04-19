import axios from "axios";
import ClicksDownloadsChart from "./ClicksDownloadsChart";
import clientEnv from "@/utils/clientEnv";
import { ITransactionsChartResponse } from "@/types";

export default async function ClicksDownloadsChartWrapper() {
  const res = await axios.get<ITransactionsChartResponse>(
    clientEnv.NEXT_PUBLIC_API_URL + "/me/chart"
  );
  const data = res.data;
  if (!data.success) {
    return <div>Error: {JSON.stringify(data.errors)}</div>;
  }
  return (
    <div>
      <ClicksDownloadsChart data={data.data} />
    </div>
  );
}
