"use client";

import TextError from "@/components/TextError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpWithCredentials } from "@/lib/actions";
import { IAuthFormState } from "@/types";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: IAuthFormState = {
  isSuccess: false,
  isError: false,
};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    signUpWithCredentials,
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
        <label htmlFor="email">Email :</label>
        <Input type="text" name="email" id="email" />
      </div>
      {state.isError && state.errors.email && (
        <TextError>{state.errors.email[0]}</TextError>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password :</label>
        <Input type="text" name="password" id="password" />
      </div>
      {state.isError && state.errors.password && (
        <TextError>{state.errors.password[0]}</TextError>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="confirmPassword">Confirm Password :</label>
        <Input type="text" name="confirmPassword" id="confirmPassword" />
      </div>
      {state.isError && state.errors.confirmPassword && (
        <TextError>{state.errors.confirmPassword[0]}</TextError>
      )}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex self-start flex-row-reverse items-center gap-2">
          <label htmlFor="terms">
            I agree to the Terms of Services and Privacy Policy.
          </label>
          <input type="checkbox" id="terms" name="terms" />
        </div>
        {state.isError && state.errors.terms && (
          <TextError>{state.errors.terms[0]}</TextError>
        )}
        <Button disabled={isPending}>Sign Up</Button>
      </div>
      {state.isError && state.errors.request && (
        <TextError>{state.errors.request[0]}</TextError>
      )}
    </form>
  );
}
