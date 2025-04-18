import { Input } from "@/components/ui/input";

export default function UsernameForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="url">
          Username
        </label>
        <Input
          type="text"
          placeholder="Enter your new username"
          name="username"
          className="bg-slate-700"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Update
      </button>
    </form>
  );
}
