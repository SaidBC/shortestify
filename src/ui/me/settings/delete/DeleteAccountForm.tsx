import { Input } from "@/components/ui/input";

export default function DeleteAccountForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="password">
          Password
        </label>
        <Input
          type="text"
          placeholder="Enter your password"
          name="password"
          className="bg-slate-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="password">
          Reasons ? (Optional)
        </label>
        <textarea
          placeholder="Enter your password"
          name="password"
          className="bg-slate-700 w-full border-1 border-white max-h-20 min-h-5 resize-y  rounded-lg p-2"
        />
      </div>
      <label className="flex gap-2">
        <input type="checkbox" name="deleteAgree" />
        <span>I accept that after deletion i can't recover it</span>
      </label>
      <button type="submit" className="bg-red-500 text-white rounded p-2">
        Delete
      </button>
    </form>
  );
}
