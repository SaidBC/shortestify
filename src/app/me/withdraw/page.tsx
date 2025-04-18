import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WithdrawForm from "@/ui/me/withdraw/WithdrawForm";

export default function Page() {
  return (
    <main className="p-4 @container flex items-center justify-center">
      <Card className="grow-1 max-w-lg bg-slate-800 text-white border-white/20">
        <CardHeader className="my-4">
          <CardTitle className="text-4xl ml-4">Withdraw</CardTitle>
          <CardDescription>
            Withdraw your money by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <WithdrawForm />
        </CardContent>
      </Card>
    </main>
  );
}
