import { SelectPayment } from "@/components/SelectPayment";
import { Input } from "@/components/ui/input";

export default function WithdrawForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="url">
          Payment Methods
        </label>
        <SelectPayment />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-md flex justify-between"
          htmlFor="amount"
        >
          <span>Amount</span>
          <div className="text-sm flex gap-2 items-center">
            <button className="bg-green-500 py-1 px-2 font-bold rounded-md text-xs">
              $0.00
            </button>
            <span className="text-slate-400">Available</span>
          </div>
        </label>
        <Input
          type="number"
          placeholder="Enter your amount"
          name="amount"
          className="bg-slate-700"
        />
      </div>
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
      <button type="submit" className="bg-green-500 text-white rounded p-2">
        Withdraw
      </button>
    </form>
  );
}
