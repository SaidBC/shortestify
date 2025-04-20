import { ITransactionsChartResultData } from "@/types";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";

export default function lastPeriodData(data: Transaction[], days: number = 30) {
  const temp = Array.from(data);
  let result: ITransactionsChartResultData[] = [];
  const date = new Date();
  for (let day = 0; day < days; day++) {
    date.setDate(date.getDate() - 1);
    let downloads = 0;
    let redirects = 0;
    for (const transaction of temp) {
      const transactionDate = new Date(transaction.createdAt);
      if (transactionDate >= date) {
        if (transaction.type === "REDIRECT") redirects++;
        else if (transaction.type === "UPLOAD") downloads++;
        temp.shift();
      } else {
        break;
      }
    }
    result.unshift({
      day: format(date, "dd MMM yyyy"),
      downloads,
      redirects,
    });
  }
  return result;
}
