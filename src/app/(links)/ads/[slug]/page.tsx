"use client";

import { useState, useEffect } from "react";
import { CountdownTimer } from "@/components/countdown/countdown-timer";
import { LinkReveal } from "@/components/link-reveal/link-reveal";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { toast } from "sonner";
import { isBot } from "@/lib/user-agent";
import { checkRateLimit } from "@/lib/rate-limiter";
import { PageWrapper } from "@/ui/ads/PageWrapper";

const COUNTDOWN_DURATION = 30; // in seconds

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetLink, setTargetLink] = useState("");
  const [adsLoaded, setAdsLoaded] = useState(false);

  useEffect(() => {
    const initializePage = () => {
      try {
        if (typeof navigator !== "undefined" && isBot(navigator.userAgent)) {
          throw new Error("Bot access detected");
        }

        const sessionId =
          window.sessionStorage.getItem("session_id") ||
          Math.random().toString(36).substring(2, 9);
        window.sessionStorage.setItem("session_id", sessionId);

        if (checkRateLimit(sessionId)) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }

        const link = process.env.NEXT_PUBLIC_TARGET_LINK;
        if (!link) {
          throw new Error("Target link not configured");
        }

        setTargetLink(link);
        setIsLoading(false);

        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            window.sessionStorage.setItem("timer_paused", "true");
          }
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setIsLoading(false);
      }
    };

    const timer = setTimeout(initializePage, 1000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", () => {});
    };
  }, []);

  const handleCountdownComplete = () => {
    setIsRevealed(true);
    toast.success("Link revealed successfully!");
  };

  const handleAdsLoaded = () => {
    setAdsLoaded(true);
  };

  if (isLoading) {
    return (
      <PageWrapper onAdsLoad={handleAdsLoaded}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Loading, please wait...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper onAdsLoad={handleAdsLoaded}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <ErrorMessage title="Error" message={error} />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper onAdsLoad={handleAdsLoaded}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Link Reveal System
          </h1>
          <p className="text-muted-foreground">
            {!adsLoaded
              ? "Loading advertisements..."
              : "Complete the countdown to reveal your exclusive link"}
          </p>
        </header>

        <div className="space-y-8">
          {adsLoaded && !isRevealed && (
            <CountdownTimer
              duration={COUNTDOWN_DURATION}
              onComplete={handleCountdownComplete}
            />
          )}

          <LinkReveal
            link={targetLink}
            isRevealed={isRevealed}
            className={
              isRevealed ? "animate-in fade-in-50 duration-300" : "opacity-50"
            }
          />
        </div>
      </div>
    </PageWrapper>
  );
}
