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
    <Select name="method">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a payment" />
      </SelectTrigger>
      <SelectContent className="bg-slate-900 text-white">
        <SelectGroup>
          <SelectLabel>Payment methods</SelectLabel>
          <SelectItem value="PAYPAL">PAYPAL</SelectItem>
          <SelectItem value="PAYEER">PAYEER</SelectItem>
          <SelectItem value="USDT">USDT</SelectItem>
          <SelectItem value="PERFECTMONEY">PERFECT MONEY</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
