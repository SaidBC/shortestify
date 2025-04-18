import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TopCards from "@/ui/me/links/TopCards";

interface LinkData {
  id: string;
  url: string;
  type: string;
  clicks: number;
  ads: number;
  createdAt: string;
}

export default function Page() {
  const data: LinkData[] = [];
  return (
    <main className="p-4 @container">
      <Card className="bg-slate-800 text-white border-white/20">
        <CardHeader className="my-4">
          <CardTitle className="text-4xl ml-4">LINKS / UPLOADS</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <TopCards />
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-2xl font-bold text-center text-white">
                Your Links
              </h2>
              <p className="text-center text-gray-400">
                Here you can manage your links and uploads.
              </p>
            </div>
            <div>
              <Table>
                <TableHeader className="bg-slate-700 ">
                  <TableRow>
                    <TableHead className="text-white">URL</TableHead>
                    <TableHead className="text-white">Type</TableHead>
                    <TableHead className="text-white">Clicks</TableHead>
                    <TableHead className="text-white">Ads</TableHead>
                    <TableHead className="text-white">Created at</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((link) => (
                    <TableRow key={link.id} className="hover:bg-slate-700">
                      <TableCell className="text-white">{link.url}</TableCell>
                      <TableCell className="text-white">{link.type}</TableCell>
                      <TableCell className="text-white">
                        {link.clicks}
                      </TableCell>
                      <TableCell className="text-white">{link.ads}</TableCell>
                      <TableCell className="text-white">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
