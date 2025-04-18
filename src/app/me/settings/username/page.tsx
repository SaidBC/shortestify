import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsernameForm from "@/ui/me/settings/username/UsernameForm";

export default function Page() {
  return (
    <main className="p-4 @container flex items-center justify-center">
      <Card className="grow-1 max-w-lg bg-slate-800 text-white border-white/20">
        <CardHeader className="my-4">
          <CardTitle className="text-4xl ml-4">Change Username</CardTitle>
          <CardDescription>
            Update your username by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <UsernameForm />
        </CardContent>
      </Card>
    </main>
  );
}
