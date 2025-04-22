"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLinkPublicAction } from "@/lib/actions";
import { createLinkPublicState } from "@/types";
import { useActionState } from "react";
import CreateLinkResponseAlert from "@/components/CreateLinkResponseAlert";

const initialState: createLinkPublicState = {
  status: "PENDING",
};

export default function SimpleShortForm() {
  const [state, formAction, isPending] = useActionState(
    createLinkPublicAction,
    initialState
  );

  return (
    <>
      <form data-testid="public-create-shortlink-form" action={formAction}>
        <div className="relative">
          <Input
            type="text"
            className="bg-slate-200 focus-visible:bg-white   lg:text-lg rounded-lg py-6 font-bold pl-4 pr-32 text-black"
            placeholder="Enter your URL here"
            name="url"
            id="url"
          />
          <Button
            disabled={isPending}
            className="absolute bg-indigo-600 hover:bg-indigo-500 cursor-pointer -right-6 top-1/2 -translate-1/2"
          >
            Create
          </Button>
        </div>
      </form>
      <CreateLinkResponseAlert state={state} />
    </>
  );
}
