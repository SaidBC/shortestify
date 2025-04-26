import Navbar from "@/ui/me/Navbar";
import "../globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Metadata } from "next";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    default: "Shortestify",
    template: "%s - Shortestify",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900 grid grid-cols-[auto_1fr]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
