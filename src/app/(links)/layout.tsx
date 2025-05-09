import Header from "@/ui/Header";
import "../globals.css";
import Footer from "@/ui/Footer";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          type="text/javascript"
          src="//pl26455922.profitableratecpm.com/75/36/74/753674a83155d85ad1e1420295d2f6f5.js"
        ></Script>
      </head>
      <body className="bg-indigo-500">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
