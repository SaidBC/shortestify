"use client";
import TextError from "@/components/TextError";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/lib/actions";
import { ISettingsFormState } from "@/types";
import { useActionState } from "react";

const initialState: ISettingsFormState = {
  isError: false,
  isSuccess: false,
};
export default function PasswordForm() {
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState
  );
  return (
    <form action={formAction} className="flex flex-col gap-4">
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
      {state.isError && state.errors.password && (
        <TextError>{state.errors.password[0]}</TextError>
      )}
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
      {state.isError && state.errors.newPassword && (
        <TextError>{state.errors.newPassword[0]}</TextError>
      )}
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
      {state.isError && state.errors.confirmPassword && (
        <TextError>{state.errors.confirmPassword[0]}</TextError>
      )}
      <button
        disabled={isPending}
        type="submit"
        className="bg-blue-500 text-white rounded p-2"
      >
        Update
      </button>
      {state.isError && state.errors.request && (
        <TextError>{state.errors.request[0]}</TextError>
      )}
      {state.isSuccess && <p>Username was updated successfully</p>}
    </form>
  );
}
