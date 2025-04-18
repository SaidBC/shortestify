"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CountDown from "@/ui/ads/CountDown";
import Link from "next/link";
import { useState } from "react";

export default function OutputCard({ clickId }: { clickId: string }) {
  const [link, setLink] = useState<string | null>(null);
  return (
    <Card className="max-w-md flex flex-col items-center bg-indigo-700 border-indigo-950 text-white mx-auto w-full">
      <CardContent>
        {!link && <CountDown setLink={setLink} clickId={clickId} />}
        {link && (
          <Link
            href={link}
            className=" bg-green-500 border-2 border-green-700 text-white font-bold rounded-lg px-4 py-3"
          >
            GO TO LINK
          </Link>
        )}
      </CardContent>
      <CardFooter>
        {!link && <p className="font-bold">Wait 30 seconds for link loads</p>}
        {link && (
          <p className="font-bold">
            <span>Click to redirect to : </span>
            <b>{link}</b>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
