import Header from "@/ui/Header";
import "../globals.css";
import Footer from "@/ui/Footer";
import { Metadata } from "next";

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
      <body className="bg-indigo-500">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
