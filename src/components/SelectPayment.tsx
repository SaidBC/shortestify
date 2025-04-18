import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectPayment() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a payment" />
      </SelectTrigger>
      <SelectContent className="bg-slate-900 text-white">
        <SelectGroup>
          <SelectLabel>Payment methods</SelectLabel>
          <SelectItem value="paypal">PAYPAL</SelectItem>
          <SelectItem value="payeer">PAYEER</SelectItem>
          <SelectItem value="usdt">USDT</SelectItem>
          <SelectItem value="perfectMoney">PERFECT MONEY</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
