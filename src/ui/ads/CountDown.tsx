"use client";

import checkClick from "@/lib/checkClick";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CountDownProps {
  setLink: Dispatch<SetStateAction<string | null>>;
  clickId: string;
}

export default function CountDown({ clickId, setLink }: CountDownProps) {
  const [time, setTime] = useState(30);
  useEffect(() => {
    if (time > 0) {
      const countDown = function () {
        setTime(time - 1);
      };
      const interval = setInterval(countDown, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      const fetchData = async () => {
        const click = await checkClick(clickId);
        if (click.success && typeof click.data === "string")
          setLink(click.data);
      };
      fetchData();
    }
  }, [time]);
  return (
    <div className="w-40 h-40 border-8 border-blue-600 rounded-full flex justify-center items-center text-center">
      <span className="font-bold text-3xl">{time}s</span>
    </div>
  );
}
