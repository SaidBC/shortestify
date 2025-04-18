import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClicksDownloadsChart from "@/ui/me/dashboard/ClicksDownloadsChart";
import { MostClickedCountry } from "@/ui/me/dashboard/MostClickedCountryChart";
import TopCards from "@/ui/me/dashboard/TopCards";

export default function Page() {
  return (
    <main className="p-4 @container">
      <Card className="bg-slate-800 text-white border-white/20">
        <CardHeader className="my-4">
          <CardTitle className="text-4xl ml-4">DASHBOARD</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <TopCards />
          <div className="grid grid-cols-1 @[64rem]:grid-cols-2 gap-4">
            <ClicksDownloadsChart />
            <MostClickedCountry />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
