import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WithdrawMethods } from "@/types";
import { randomUUID } from "crypto";

interface lastWithdrawResponseData {
  date: Date;
  amount: number;
  username: string;
  method: WithdrawMethods;
}

export default function LastWithdraw() {
  const lastWithrawsList: lastWithdrawResponseData[] = [
    {
      username: "JOGO",
      date: new Date(),
      amount: 20,
      method: "PAYEER",
    },
    {
      username: "JOGO",
      date: new Date(),
      amount: 20,
      method: "PAYEER",
    },
    {
      username: "JOGO",
      date: new Date(),
      amount: 20,
      method: "PAYEER",
    },
    {
      username: "JOGO",
      date: new Date(),
      amount: 20,
      method: "PAYEER",
    },
    {
      username: "JOGO",
      date: new Date(),
      amount: 20,
      method: "PAYEER",
    },
    {
      username: "JOGO",
      date: new Date(),
      amount: 20,
      method: "USDT",
    },
  ];
  return (
    <div className="px-2 sm:px-4 mt-12">
      <Table className="max-w-7xl mx-auto">
        <TableHeader className="bg-slate-200">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&>*]:even:bg-slate-50  [&>*]:odd:bg-slate-100">
          {lastWithrawsList.map((data) => {
            return (
              <TableRow key={randomUUID()}>
                <TableCell>{data.date.toDateString()}</TableCell>
                <TableCell>{data.username}</TableCell>
                <TableCell>${data.amount}</TableCell>
                <TableCell>{data.method}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
