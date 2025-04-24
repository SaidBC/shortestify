"use client";

import { useState, useEffect } from "react";
import { AdBanner } from "@/components/AdsterraAd";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  onAdsLoad?: () => void;
}

export function PageWrapper({
  children,
  className,
  onAdsLoad,
}: PageWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [loadedAds, setLoadedAds] = useState(0);
  const [totalAds, setTotalAds] = useState(4);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setTotalAds(mobile ? 2 : 4);
      setLoadedAds(0);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleAdLoad = () => {
    setLoadedAds((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalAds) {
        onAdsLoad?.();
      }
      return newCount;
    });
  };

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {isMobile ? (
        <div className="flex flex-col min-h-screen">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2 border-b">
            <AdBanner
              key=""
              className="max-w-full overflow-hidden px-2"
              onLoad={handleAdLoad}
            />
          </div>
          <div className="border-t py-2">
            <AdBanner
              key=""
              className="max-w-full overflow-hidden px-2"
              onLoad={handleAdLoad}
            />
          </div>

          <main className="flex-1 px-4 py-6">{children}</main>

          <div className="border-t py-2">
            <AdBanner
              key=""
              className="max-w-full overflow-hidden px-2"
              onLoad={handleAdLoad}
            />
          </div>
          <div className="border-t py-2">
            <AdBanner
              key=""
              className="max-w-full overflow-hidden px-2"
              onLoad={handleAdLoad}
            />
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen">
          <div className="hidden md:block md:w-[300px] border-r p-4">
            <AdBanner
              position="side"
              key=""
              className="w-full sticky top-4"
              onLoad={handleAdLoad}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-4 border-b">
              <AdBanner
                key=""
                className="max-w-[728px] mx-auto"
                onLoad={handleAdLoad}
              />
            </div>

            <main className="flex-1 p-8">{children}</main>

            <div className="border-t py-4">
              <AdBanner
                key=""
                className="max-w-[728px] mx-auto"
                onLoad={handleAdLoad}
              />
            </div>
          </div>

          <div className="hidden lg:block lg:w-[300px] border-l p-4">
            <AdBanner
              position="side"
              key=""
              className="w-full sticky top-4"
              onLoad={handleAdLoad}
            />
          </div>
        </div>
      )}
    </div>
  );
}
