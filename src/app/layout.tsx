import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
  variable: "--font-noto-serif-jp",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "nasjp.dev",
  description: "nasjp.dev",
};

const criticalCSS = `
  body{margin:0;padding:0;background-color:#fff}
  *{box-sizing:border-box}
  .h-dvh{height:100dvh}
  .bg-white{background-color:#fff}
  .relative{position:relative}
  .overflow-hidden{overflow:hidden}
  .absolute{position:absolute}
  .inset-0{inset:0}
  .flex{display:flex}
  .items-center{align-items:center}
  .justify-center{justify-content:center}
  .p-0{padding:0}
  .opacity-100{opacity:1}
  .opacity-0{opacity:0}
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Critical CSS for performance */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body className={`${notoSerifJP.variable} ${notoSerifJP.className}`}>
        {children}
      </body>
    </html>
  );
}
