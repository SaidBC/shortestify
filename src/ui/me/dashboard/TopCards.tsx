import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function TopCards() {
  return (
    <div className="grid grid-cols-1  @[40rem]:grid-cols-2 @[64rem]:grid-cols-3 gap-4">
      <Card className="bg-slate-900 max-w-md mx-auto w-full rounded-none border-t-4 border-green-600 border-b-0 border-x-0">
        <CardContent className="flex flex-col">
          <div className="flex justify-center gap-2 py-6">
            <span className="font-bold text-center text-6xl text-white">
              $0
            </span>
            <span className="text-green-400 font-bold text-xl">+$0.00</span>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-white font-bold text-center w-full text-xl">
            Total Balance
          </span>
        </CardFooter>
      </Card>
      <Card className="bg-slate-900 max-w-md mx-auto w-full rounded-none border-t-4 border-blue-600 border-b-0 border-x-0">
        <CardContent className="flex flex-col">
          <div className="flex justify-center gap-2 py-6">
            <span className="font-bold text-center text-6xl text-white">0</span>
            <span className="text-green-400 font-bold text-xl">+%0.00</span>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-white font-bold text-center w-full text-xl">
            Daily Clicks
          </span>
        </CardFooter>
      </Card>
      <Card className="bg-slate-900 max-w-md mx-auto w-full rounded-none border-t-4 border-amber-600 border-b-0 border-x-0">
        <CardContent className="flex flex-col">
          <div className="flex justify-center gap-2 py-6">
            <span className="font-bold text-center text-6xl text-white">0</span>
            <span className="text-green-400 font-bold text-xl">+%0.00</span>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-white font-bold text-center w-full text-xl">
            Daily Downloads
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
