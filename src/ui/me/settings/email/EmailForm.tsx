import { Input } from "@/components/ui/input";

export default function EmailForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="url">
          Email
        </label>
        <Input
          type="text"
          placeholder="Enter your new email"
          name="username"
          className="bg-slate-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="url">
          Password
        </label>
        <Input
          type="password"
          placeholder="Enter your password"
          name="password"
          className="bg-slate-700"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Update
      </button>
    </form>
  );
}
