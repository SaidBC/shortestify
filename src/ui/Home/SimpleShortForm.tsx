"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLinkPublicAction } from "@/lib/actions";
import { createLinkPublicState } from "@/types";
import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCheck } from "lucide-react";
import clientEnv from "@/utils/clientEnv";

const initialState: createLinkPublicState = {
  status: "PENDING",
  data: undefined,
  errors: {},
};

export default function SimpleShortForm() {
  const [state, formAction, isPending] = useActionState(
    createLinkPublicAction,
    initialState
  );

  return (
    <>
      <form action={formAction}>
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
      {state.status === "FAILED" && state.errors && (
        <Alert className="text-red-900 bg-red-400 border-red-700">
          <AlertCircle></AlertCircle>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="text-red-900">
            {Object.values(state.errors)[0]}
          </AlertDescription>
        </Alert>
      )}
      {state.status === "SUCCESS" && state.data && (
        <Alert className="text-green-900 bg-green-400 border-green-700">
          <CheckCheck />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription className="text-green-900">
            <p className="flex flex-col md:flex-row">
              <span>Your new url is :</span>
              <b>
                {clientEnv.NEXT_PUBLIC_ADS_URL + "/" + state.data.shortSlug}
              </b>
            </p>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
