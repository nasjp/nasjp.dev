import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-jp",
  adjustFontFallback: true,
});

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
      <head>
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Critical CSS for performance
          dangerouslySetInnerHTML={{
            __html: `
              * {
                box-sizing: border-box;
              }
              body {
                margin: 0;
                padding: 0;
                font-family: var(--font-noto-serif-jp), serif;
                -webkit-font-smoothing: antialiased;
              }
            `,
          }}
        />
      </head>
      <body className={`${notoSerifJP.variable} ${notoSerifJP.className}`}>
        {children}
      </body>
    </html>
  );
}
