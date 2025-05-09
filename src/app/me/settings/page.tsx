import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateLinksForm from "@/ui/me/create/CreateLinksForm";
import SettingsOptions from "@/ui/me/settings/SettingsOptions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Page() {
  return (
    <main className="p-4 @container flex items-center justify-center">
      <Card className="grow-1 max-w-lg bg-slate-800 text-white border-white/20">
        <CardHeader className="my-4">
          <CardTitle className="text-4xl ml-4">Settings</CardTitle>
          <CardDescription>
            Update your by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <SettingsOptions />
        </CardContent>
      </Card>
    </main>
  );
}
