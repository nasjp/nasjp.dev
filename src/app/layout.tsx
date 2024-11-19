import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nasjp.dev",
  description: "nasjp.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-serif">
        <div className="max-w-5xl mx-auto p-4">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
