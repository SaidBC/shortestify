import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TopCardsProps {
  redirects: number;
  uploads: number;
  dailyRedirects: number;
  dailyUploads: number;
}

export default function TopCards({
  redirects,
  uploads,
  dailyRedirects,
  dailyUploads,
}: TopCardsProps) {
  return (
    <div className="grid grid-cols-1  @[40rem]:grid-cols-2  gap-4">
      <Card className="bg-slate-900 max-w-lg mx-auto w-full rounded-none border-t-4 border-green-600 border-b-0 border-x-0">
        <CardContent className="flex flex-col">
          <div className="flex justify-center gap-2 py-6">
            <span className="font-bold text-center text-6xl text-white">
              {redirects}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-white font-bold text-center w-full text-xl">
            Total Redirects
          </span>
        </CardFooter>
      </Card>
      <Card className="bg-slate-900 max-w-lg mx-auto w-full rounded-none border-t-4 border-blue-600 border-b-0 border-x-0">
        <CardContent className="flex flex-col">
          <div className="flex justify-center gap-2 py-6">
            <span className="font-bold text-center text-6xl text-white">
              {uploads}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-white font-bold text-center w-full text-xl">
            Total Uploads
          </span>
        </CardFooter>
      </Card>
      <Card className="bg-slate-900 max-w-lg mx-auto w-full rounded-none border-t-4 border-amber-600 border-b-0 border-x-0">
        <CardContent className="flex flex-col">
          <div className="flex justify-center gap-2 py-6">
            <span className="font-bold text-center text-6xl text-white">
              {dailyRedirects}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-white font-bold text-center w-full text-xl">
            Daily Redirects
          </span>
        </CardFooter>
      </Card>
      <Card className="bg-slate-900 max-w-lg mx-auto w-full rounded-none border-t-4 border-amber-600 border-b-0 border-x-0">
        <CardContent className="flex flex-col">
          <div className="flex justify-center gap-2 py-6">
            <span className="font-bold text-center text-6xl text-white">
              {dailyUploads}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-white font-bold text-center w-full text-xl">
            Daily Uploads
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
