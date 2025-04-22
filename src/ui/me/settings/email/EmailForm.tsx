"use client";
import TextError from "@/components/TextError";
import { Input } from "@/components/ui/input";
import { updateEmail } from "@/lib/actions";
import { ISettingsFormState } from "@/types";
import { useActionState } from "react";

const initialState: ISettingsFormState = {
  isError: false,
  isSuccess: false,
};
export default function EmailForm() {
  const [state, formAction, isPending] = useActionState(
    updateEmail,
    initialState
  );
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="url">
          Your new email
        </label>
        <Input
          type="text"
          placeholder="Enter your new email"
          name="email"
          className="bg-slate-700"
        />
      </div>
      {state.isError && state.errors.email && (
        <TextError>{state.errors.email[0]}</TextError>
      )}
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
      {state.isError && state.errors.password && (
        <TextError>{state.errors.password[0]}</TextError>
      )}
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Update
      </button>
      {state.isError && state.errors.request && (
        <TextError>{state.errors.request[0]}</TextError>
      )}
      {state.isSuccess && <p>Username was updated successfully</p>}
    </form>
  );
}
