"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
  className?: string;
}

export function CountdownTimer({
  duration,
  onComplete,
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(100);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Anti-cheat mechanism to prevent timer manipulation
  const checkTimeDrift = useCallback(() => {
    const now = Date.now();
    const expectedElapsed = 1000; // 1 second in milliseconds
    const actualElapsed = now - lastUpdated;

    // If there's significant time drift (more than 200ms difference)
    if (Math.abs(actualElapsed - expectedElapsed) > 200) {
      console.warn("Timer manipulation detected");
      // Reset the timer to prevent cheating
      setTimeLeft(duration);
      setProgress(100);
    }

    setLastUpdated(now);
  }, [lastUpdated, duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        checkTimeDrift();
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          setProgress((newTime / duration) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
      onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, duration, onComplete, checkTimeDrift]);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold tracking-tight text-primary">
            {formatTime(timeLeft)}
          </div>
          <Progress
            value={progress}
            className="w-full h-2"
            aria-label="Countdown progress"
          />
          <p className="text-sm text-muted-foreground">
            Please wait for the countdown to complete
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
