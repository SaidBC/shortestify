import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateLinksForm from "@/ui/me/create/CreateLinksForm";

export default function Page() {
  return (
    <main className="p-4 @container flex items-center justify-center">
      <Card className="grow-1 max-w-lg bg-slate-800 text-white border-white/20">
        <CardHeader className="my-4">
          <CardTitle className="text-4xl ml-4">CREATE LINKS</CardTitle>
          <CardDescription>
            Create a new link by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <CreateLinksForm />
        </CardContent>
      </Card>
    </main>
  );
}
