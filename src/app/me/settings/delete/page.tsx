import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteAccountForm from "@/ui/me/settings/delete/DeleteAccountForm";

export default function Page() {
  return (
    <main className="p-4 @container flex items-center justify-center">
      <Card className="grow-1 max-w-lg bg-slate-800 text-white border-white/20">
        <CardHeader className="my-4">
          <CardTitle className="text-4xl ml-4">Delete Account</CardTitle>
          <CardDescription>
            Delete your account by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <DeleteAccountForm />
        </CardContent>
      </Card>
    </main>
  );
}
