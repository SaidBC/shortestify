import Navbar from "@/ui/me/Navbar";
import "../globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

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
