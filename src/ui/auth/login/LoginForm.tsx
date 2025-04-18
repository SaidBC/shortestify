"use client";
import TextError from "@/components/TextError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithCredentials } from "@/lib/actions";
import { IAuthFormState } from "@/types";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: IAuthFormState = {
  isSuccess: false,
  isError: false,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithCredentials,
    initialState
  );

  useEffect(() => {
    if (state.isSuccess) redirect("/me/dashboard");
  }, [state.isSuccess]);
  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="username">Username :</label>
        <Input type="text" name="username" id="username" />
      </div>
      {state.isError && state.errors.username && (
        <TextError>{state.errors.username[0]}</TextError>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password :</label>
        <Input type="text" name="password" id="password" />
      </div>
      {state.isError && state.errors.password && (
        <TextError>{state.errors.password[0]}</TextError>
      )}
      <div className="flex gap-4 mt-2">
        <div className="flex flex-row-reverse items-center gap-2">
          <label htmlFor="rememberMe">Remember me</label>
          <input type="checkbox" id="rememberMe" name="rememberMe" />
        </div>
        <Button disabled={isPending} className="grow-1">
          Login
        </Button>
      </div>
      {state.isError && state.errors.request && (
        <TextError>{state.errors.request[0]}</TextError>
      )}
      {state.isError && state.errors.credentials && (
        <TextError>{state.errors.credentials[0]}</TextError>
      )}
    </form>
  );
}
