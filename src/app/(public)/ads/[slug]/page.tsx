import { IgetUrlsResponse } from "@/types";
import AdSkeleton from "@/ui/ads/AdSkeleton";
import OutputCard from "@/ui/ads/OutputCard";
import OutputContainer from "@/ui/ads/OutputContainer";
import clientEnv from "@/utils/clientEnv";
import axios from "axios";
import { forbidden, notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const res = await axios.get<IgetUrlsResponse>(
    clientEnv.NEXT_PUBLIC_API_URL + "/urls?shortSlug=" + slug
  );
  if (!res.data.success)
    return (
      <main className="min-h-dvh pt-36 grid grid-cols-[auto_1fr_auto] px-4">
        Something went wrong
      </main>
    );
  if (res.data.data.length === 0) notFound();
  return (
    <main className="min-h-dvh pt-36 grid grid-cols-[auto_1fr_auto] px-4">
      <div>
        <AdSkeleton classname="w-40 h-100" />
      </div>
      <div className="flex flex-col gap-4 justify-self-center">
        <AdSkeleton classname="w-125 h-20" />
        <OutputContainer shortSlug={slug} />
        <AdSkeleton classname="w-125 h-20" />
      </div>
      <div>
        <AdSkeleton classname="w-40 h-100" />
      </div>
    </main>
  );
}
