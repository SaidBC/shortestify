"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkRevealProps {
  link: string;
  isRevealed: boolean;
  className?: string;
}

export function LinkReveal({ link, isRevealed, className }: LinkRevealProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const handleRedirect = () => {
    if (!isRevealed) return;
    
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = link;
    }, 500);
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-xl font-semibold">
            {isRevealed ? "Your link is ready!" : "Link is locked"}
          </h3>
          
          <div 
            className={cn(
              "w-full p-4 rounded-md transition-all duration-300 overflow-hidden",
              isRevealed 
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-muted text-muted-foreground border border-muted cursor-not-allowed"
            )}
          >
            <p className="truncate font-mono text-sm">
              {isRevealed ? link : "●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●"}
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isRevealed 
              ? "Click the button below to visit the link" 
              : "Complete the countdown to reveal the link"}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleRedirect}
          disabled={!isRevealed || isRedirecting}
          variant={isRevealed ? "default" : "outline"}
        >
          {isRedirecting ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" /> 
              Redirecting...
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" /> 
              {isRevealed ? "Visit Link" : "Locked"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}