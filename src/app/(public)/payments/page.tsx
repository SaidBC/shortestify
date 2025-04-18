import LastWithdraw from "@/ui/payments/LastWithdraws";

export default function Page() {
  return (
    <main className="pt-18 min-h-dvh">
      <section className="pt-10 px-2 sm:px-4">
        <div className=" text-white flex flex-col gap-2 pl-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Last withdraws :</h1>
          <p className="sm:text-lg">Here there your last withdraws list .</p>
        </div>
      </section>
      <LastWithdraw />
    </main>
  );
}
