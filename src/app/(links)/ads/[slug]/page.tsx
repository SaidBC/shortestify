import axios from "axios";
import { IGetShortlinkResponse } from "@/types";
import clientEnv from "@/utils/clientEnv";
import PageContainer from "@/ui/ads/PageContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const shortlinkResponse = await axios.get<IGetShortlinkResponse>(
    clientEnv.NEXT_PUBLIC_API_URL + "/shortlinks/" + slug
  );
  if (!shortlinkResponse.data.success) throw new Error("somthing went wrong");
  const shortlink = shortlinkResponse.data.data;
  if (!shortlink)
    return {
      title: "shortlink not found - Shortestify",
      description: "shortlink is not found",
    };
  return {
    title: shortlink.shortSlug + " shortlink - Shortestify",
    description: "Discover Shortestify ",
  };
}

export default function Page() {
  return <PageContainer />;
}
