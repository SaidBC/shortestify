"use client";
import { SelectPayment } from "@/components/SelectPayment";
import TextError from "@/components/TextError";
import { Input } from "@/components/ui/input";
import { withdraw } from "@/lib/actions";
import { IUserBalanceResponse, IWithdrawFormState } from "@/types";
import globalFetcher from "@/utils/globalFetcher";
import { useActionState, useCallback, useRef, useState } from "react";
import useSWR from "swr";

const initialState: IWithdrawFormState = {
  isError: false,
  isSuccess: false,
};

export default function WithdrawForm() {
  const [state, formAction, isPending] = useActionState(withdraw, initialState);
  const { data, isLoading, error } = useSWR<IUserBalanceResponse>(
    "/me/balance",
    globalFetcher
  );
  const [amount, setAmount] = useState(0);
  const amountInputRef = useRef<HTMLInputElement | null>(null);
  const handleSetAvailableAmount = useCallback(
    function () {
      if (amountInputRef.current) amountInputRef.current.focus();
      if (data && data.success) setAmount(data.data.balance);
    },
    [data]
  );
  if (isLoading) return <>Loading ...</>;
  if (!data || error) return <>Error: Something went wrong</>;
  const userBalance = data;
  if (!userBalance.success) {
    return <div>Error: Something went wrong</div>;
  }
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="method">
          Payment Methods
        </label>
        <SelectPayment />
      </div>
      {state.isError && state.errors.method && (
        <TextError>{state.errors.method[0]}</TextError>
      )}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="to">
          To :
        </label>
        <Input
          type="text"
          placeholder="Enter your account"
          name="to"
          className="bg-slate-700"
        />
      </div>
      {state.isError && state.errors.to && (
        <TextError>{state.errors.to[0]}</TextError>
      )}
      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-md flex justify-between"
          htmlFor="amount"
        >
          <span>Amount</span>
          <div className="text-sm flex gap-2 items-center">
            <button
              type="button"
              onClick={handleSetAvailableAmount}
              className="bg-green-500 py-1 px-2 font-bold rounded-md text-xs"
            >
              ${userBalance.data.balance.toFixed(2)}
            </button>
            <span className="text-slate-400">Available</span>
          </div>
        </label>
        <Input
          ref={amountInputRef}
          type="number"
          placeholder="Enter your amount"
          name="amount"
          className="bg-slate-700"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          value={amount}
        />
      </div>
      {state.isError && state.errors.amount && (
        <TextError>{state.errors.amount[0]}</TextError>
      )}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="password">
          Password
        </label>
        <Input
          type="password"
          placeholder="Enter your password"
          name="password"
          className="bg-slate-700"
        />
      </div>
      {state.isError && state.errors.password && (
        <TextError>{state.errors.password[0]}</TextError>
      )}
      <button type="submit" className="bg-green-500 text-white rounded p-2">
        Withdraw
      </button>
      {state.isError && state.errors.request && (
        <TextError>{state.errors.request[0]}</TextError>
      )}
    </form>
  );
}
