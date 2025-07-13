import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false, // サブセット化により軽量化
  variable: "--font-noto-serif-jp",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "nasjp.dev",
  description: "nasjp.dev",
};

const criticalCSS =
  "*{box-sizing:border-box}body{margin:0;padding:0;background:#fff}.h-dvh{height:100dvh}.bg-white{background:#fff}.relative{position:relative}.overflow-hidden{overflow:hidden}.absolute{position:absolute}.inset-0{inset:0}.flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.opacity-100{opacity:1}.opacity-0{opacity:0}";

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
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${notoSerifJP.variable} ${notoSerifJP.className}`}>
        {children}
      </body>
    </html>
  );
}
