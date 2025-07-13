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

const criticalCSS =
  "*,::before,::after{box-sizing:border-box}body{margin:0;padding:0;background:#fff;font-family:var(--font-noto-serif-jp),serif;-webkit-font-smoothing:antialiased}svg{display:block}.h-dvh{height:100dvh}.bg-white{background:#fff}.relative{position:relative}.overflow-hidden{overflow:hidden}.absolute{position:absolute}.inset-0{inset:0}.flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.opacity-100{opacity:1}.opacity-0{opacity:0}.transition-opacity{transition-property:opacity}.duration-5000{transition-duration:5s}.ease-in-out{transition-timing-function:ease-in-out}";

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
