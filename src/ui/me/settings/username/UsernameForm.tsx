"use client";
import TextError from "@/components/TextError";
import { Input } from "@/components/ui/input";
import { updateUsername } from "@/lib/actions";
import { ISettingsFormState } from "@/types";
import { useActionState } from "react";

const initialState: ISettingsFormState = {
  isError: false,
  isSuccess: false,
};

export default function UsernameForm() {
  const [state, formAction, isPending] = useActionState(
    updateUsername,
    initialState
  );
  return (
    <form action={formAction} className="flex flex-col gap-4">
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
      {state.isError && state.errors.username && (
        <TextError>{state.errors.username[0]}</TextError>
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
