import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IGetLinksResponse } from "@/types";
import TopCards from "@/ui/me/links/TopCards";
import clientEnv from "@/utils/clientEnv";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

axios.defaults.baseURL = clientEnv.NEXT_PUBLIC_API_URL;

export default async function Page() {
  const token = await getToken({
    secureCookie: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
    raw: true,
    req: {
      headers: await headers(),
    },
  });
  const res = await axios.get<IGetLinksResponse>("/me/links", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!res.data.success) return <>{res.data.errors.request[0]}</>;
  const { links, ...data } = res.data.data;
  return (
    <main className="p-4 @container">
      <Card className="bg-slate-800 text-white border-white/20">
        <CardHeader className="my-4">
          <CardTitle className="text-4xl ml-4">LINKS / UPLOADS</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <TopCards {...data} />
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
                  {links.map((link) => (
                    <TableRow
                      key={link.shortSlug}
                      className="hover:bg-slate-700"
                    >
                      <TableCell className="text-white">
                        {link.shortSlug}
                      </TableCell>
                      <TableCell className="text-white">{link.type}</TableCell>
                      <TableCell className="text-white">
                        {link._count.clicks}
                      </TableCell>
                      <TableCell className="text-white">
                        {link.ads ? "Yes" : "No"}
                      </TableCell>
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
