import { AlertCircle, CheckCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import clientEnv from "@/utils/clientEnv";
import { createLinkPublicState } from "@/types";

export default function CreateLinkResponseAlert({
  state,
}: {
  state: createLinkPublicState;
}) {
  return (
    <>
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
