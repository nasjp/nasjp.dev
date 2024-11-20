import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import ClassicBrowserLayout from "@/components/ClassiBrowserLayout";
import { getPathTitleMap } from "@/lib/content";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "nasjp.dev",
  description: "nasjp.dev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathTitleMap = await getPathTitleMap();
  return (
    <html lang="ja">
      <body className={notoSerifJP.className}>
        <ClassicBrowserLayout pathTitleMap={pathTitleMap}>
          {children}
        </ClassicBrowserLayout>
      </body>
    </html>
  );
}
