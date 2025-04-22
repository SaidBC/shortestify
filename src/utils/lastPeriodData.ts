import { ITransactionsChartResultData } from "@/types";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";

export default function lastPeriodData(data: Transaction[], days: number = 30) {
  let result: ITransactionsChartResultData[] = [];
  const date = new Date(format(new Date(), "dd MMM yyyy"));
  for (let day = 0; day < days; day++) {
    let downloads = 0;
    let redirects = 0;
    for (const transaction of data.slice(downloads + redirects)) {
      const transactionDate = new Date(
        format(new Date(transaction.createdAt), "dd MMM yyyy")
      );
      if (transactionDate.getTime() === date.getTime()) {
        if (transaction.type === "REDIRECT") redirects++;
        else if (transaction.type === "UPLOAD") downloads++;
      } else {
        break;
      }
    }
    result.unshift({
      day: format(date, "dd MMM yyyy"),
      downloads,
      redirects,
    });
    date.setDate(date.getDate() - 1);
  }
  return result;
}
