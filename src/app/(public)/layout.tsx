import Header from "@/ui/Header";
import "../globals.css";
import Footer from "@/ui/Footer";

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
