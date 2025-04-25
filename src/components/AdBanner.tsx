"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
}

export default function AdBanner({
  className,
  width = 728,
  height = 90,
  onLoad,
}: AdBannerProps) {
  const adContainerRef = useRef<HTMLDivElement | null>(null);
  const adLoaded = useRef(false);
  const onLoadCalled = useRef(false);
  const loadAttempts = useRef(0);
  const maxAttempts = 3;
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleOnLoad = () => {
    if (!onLoadCalled.current && onLoad) {
      onLoadCalled.current = true;
      onLoad();
    }
  };

  useEffect(() => {
    if (!adContainerRef.current || adLoaded.current) return;

    const loadAd = async () => {
      try {
        const container = adContainerRef.current;
        if (!container) {
          throw new Error("Ad container not found");
        }
        container.innerHTML = "";
        setLoadError(null);
        const adId = `ad-$-${Math.random().toString(36).substr(2, 9)}`;

        // Create container div with unique ID
        const adDiv = document.createElement("div");
        adDiv.id = adId;
        container.appendChild(adDiv);

        // Create and append the atOptions script
        const optionsScript = document.createElement("script");
        optionsScript.type = "text/javascript";
        optionsScript.innerHTML = `
          window.atOptions = {
            'key': '4c73750420c446c024df0156ae7cc7c2',
            'format': 'iframe',
            'height': ${width},
            'width': ${height},
            'params': {}
          };
        `;
        container.appendChild(optionsScript);

        // Create and append the ad script
        const adScript = document.createElement("script");
        adScript.type = "text/javascript";
        adScript.src =
          "//www.highperformanceformat.com/4c73750420c446c024df0156ae7cc7c2/invoke.js";
        adScript.async = true;

        let checkInterval: NodeJS.Timeout;
        let loadTimeout: NodeJS.Timeout;

        const cleanup = () => {
          clearInterval(checkInterval);
          clearTimeout(loadTimeout);
        };

        // Set up load monitoring with exponential backoff
        const retryDelay = Math.min(
          1000 * Math.pow(2, loadAttempts.current),
          5000
        );
        loadTimeout = setTimeout(() => {
          if (!adLoaded.current) {
            cleanup();
            loadAttempts.current++;

            if (loadAttempts.current < maxAttempts) {
              console.log(
                `Retrying ad load for ${adId}, attempt ${
                  loadAttempts.current + 1
                } after ${retryDelay}ms`
              );
              loadAd();
            } else {
              const errorMessage = `Failed to load ad after ${maxAttempts} attempts`;
              console.error(errorMessage);
              setLoadError(errorMessage);
              handleOnLoad(); // Ensure we don't block the user experience
            }
          }
        }, retryDelay);

        // Monitor ad load success
        checkInterval = setInterval(() => {
          if (!container.isConnected) {
            cleanup();
            return;
          }

          const adFrame = container.querySelector("iframe");
          if (adFrame) {
            cleanup();
            adLoaded.current = true;
            handleOnLoad();
          }
        }, 100);

        container.appendChild(adScript);

        return cleanup;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error loading ad";
        console.error("Error loading ad:", errorMessage);
        setLoadError(errorMessage);
        handleOnLoad(); // Don't block the user experience on error
      }
    };

    // Initial load with a small delay to prevent race conditions
    const initialLoadTimeout = setTimeout(() => {
      if (!adLoaded.current && !onLoadCalled.current) {
        loadAd();
      }
    }, 100);

    return () => {
      clearTimeout(initialLoadTimeout);
    };
  }, [width, height, onLoad]);

  return (
    <div className={className}>
      <div
        ref={adContainerRef}
        className={`bg-white border border-border rounded-lg shadow-sm overflow-hidden`}
        style={{
          width,
          height,
        }}
      >
        <div className="flex justify-center items-center text-sm text-muted-foreground h-full">
          {loadError ? (
            <span className="text-red-500">{loadError}</span>
          ) : (
            "Loading advertisement..."
          )}
        </div>
      </div>
    </div>
  );
}
