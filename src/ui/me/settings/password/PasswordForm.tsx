import { Input } from "@/components/ui/input";

export default function PasswordForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="password">
          Current Password
        </label>
        <Input
          type="text"
          placeholder="Enter your current password"
          name="password"
          className="bg-slate-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="newPassword">
          New Password
        </label>
        <Input
          type="text"
          placeholder="Enter your new password"
          name="newPassword"
          className="bg-slate-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="confirmPassword">
          Confirm New Password
        </label>
        <Input
          type="text"
          placeholder="Confirm your new password"
          name="confirmPassword"
          className="bg-slate-700"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Update
      </button>
    </form>
  );
}
