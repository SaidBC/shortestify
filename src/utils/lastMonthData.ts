import { Transaction } from "@prisma/client";
import { format } from "date-fns";

interface ResultData {
  day: string;
  downloads: number;
  clicks: number;
}

export default function lastMonthData(data: Transaction[]) {
  let result: ResultData[] = [];
  const date = new Date();
  for (let day = 0; day < 30; day++) {
    date.setDate(date.getDate() - 1);
    let downloads = 0 + Math.floor(Math.random() * 10);
    let clicks = 0 + Math.floor(Math.random() * 10);
    for (const transaction of data) {
      const transactionDate = new Date(transaction.createdAt);
      if (transactionDate >= date) {
        if (transaction.type === "CLICK") {
          clicks++;
        } else if (transaction.type === "DOWNLOAD") {
          downloads++;
        }
      }
    }
    result.unshift({
      day: format(date, "dd MMM yyyy"),
      downloads,
      clicks,
    });
  }
  return result;
}
