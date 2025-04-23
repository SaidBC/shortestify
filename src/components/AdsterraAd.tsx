"use client";
import { useEffect } from "react";

interface AdsterraAdProps {
  adKey: string;
  width?: number;
  height?: number;
  format?: "iframe" | "javascript";
}

const AdsterraAd = ({
  adKey,
  width = 728,
  height = 90,
  format = "iframe",
}: AdsterraAdProps) => {
  useEffect(() => {
    if (format === "javascript") {
      // Create configuration object
      const atOptions = {
        key: adKey,
        format: "iframe",
        height: height,
        width: width,
        params: {},
      };

      // Create script elements
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.text = `atOptions = ${JSON.stringify(atOptions)};`;

      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
      invokeScript.async = true;

      // Append scripts to document
      document.body.appendChild(configScript);
      document.body.appendChild(invokeScript);

      return () => {
        document.body.removeChild(configScript);
        document.body.removeChild(invokeScript);
      };
    }
  }, [adKey, width, height, format]);

  if (format === "iframe") {
    return (
      <iframe
        src={`https://www.highperformanceformat.com/${adKey}/invoke.html`}
        width={width}
        height={height}
        style={{
          border: "none",
          overflow: "hidden",
          display: "block",
          margin: "0 auto",
        }}
        scrolling="no"
      />
    );
  }

  return <div id={`adsterra-${adKey}`} />;
};

export default AdsterraAd;
