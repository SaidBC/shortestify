"use client";

import TextError from "@/components/TextError";
import { Input } from "@/components/ui/input";
import { userCreateLink } from "@/lib/actions";
import { IUserCreateLinkState } from "@/types";
import clientEnv from "@/utils/clientEnv";
import { useActionState, useCallback, useState } from "react";

const initialState: IUserCreateLinkState = {
  status: "PENDING",
};

export default function CreateLinksForm() {
  const [redirectURL, setRedirectURL] = useState("");
  const [shortSlug, setShortSlug] = useState("");
  const [ads, setAds] = useState<"yes" | "no">("yes");
  const [state, formAction] = useActionState(userCreateLink, initialState);
  const handleWithAds = useCallback(() => setAds("yes"), []);
  const handleWithNoAds = useCallback(() => setAds("no"), []);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="url">
          Your URL
        </label>
        <Input
          type="text"
          placeholder="Enter a url"
          name="url"
          className="bg-slate-700"
          value={redirectURL}
          onChange={(e) => {
            setRedirectURL(e.target.value);
          }}
        />
      </div>
      {state.status === "FAILED" && state.errors.url && (
        <TextError>{state.errors.url[0]}</TextError>
      )}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="url">
          Your Shortlink (optional)
        </label>
        <Input
          type="text"
          placeholder="Enter a short slug"
          name="shortSlug"
          className="bg-slate-700"
          value={shortSlug}
          onChange={(e) => {
            setShortSlug(e.target.value);
          }}
        />
        {shortSlug && (
          <p className="break-words">
            Your shortlink will be :{" "}
            {ads === "yes"
              ? clientEnv.NEXT_PUBLIC_ADS_URL + "/" + shortSlug
              : clientEnv.NEXT_PUBLIC_NOADS_URL + "/" + shortSlug}
          </p>
        )}
      </div>
      {state.status === "FAILED" && state.errors.shortSlug && (
        <TextError>{state.errors.shortSlug[0]}</TextError>
      )}
      <div>
        <p className="font-bold text-md">Includes ads ?</p>
        <div className="ml-2 flex gap-4">
          <label className="font-bold text-md flex gap-2">
            <input
              type="radio"
              name="ads"
              value={"yes"}
              onChange={handleWithAds}
              checked={ads === "yes"}
            />
            <span>Yes</span>
          </label>
          <label className="font-bold text-md flex gap-2">
            <input
              type="radio"
              name="ads"
              value={"no"}
              onChange={handleWithNoAds}
              checked={ads === "no"}
            />
            <span>No</span>
          </label>
        </div>
        {state.status === "FAILED" && state.errors.ads && (
          <TextError>{state.errors.ads[0]}</TextError>
        )}
      </div>
      {state.status === "SUCCESS" && (
        <p>
          Your new URL is :{" "}
          {state.data.ads
            ? clientEnv.NEXT_PUBLIC_ADS_URL + "/" + state.data.shortSlug
            : clientEnv.NEXT_PUBLIC_NOADS_URL + "/" + state.data.shortSlug}
        </p>
      )}
      {state.status === "FAILED" && state.errors.request && (
        <p>{state.errors.request[0]}</p>
      )}
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Create Link
      </button>
    </form>
  );
}
