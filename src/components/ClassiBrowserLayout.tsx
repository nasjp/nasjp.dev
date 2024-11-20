"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Github, Home, Search } from "lucide-react";
import { Orbit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ClassicBrowserLayoutProps {
  children: ReactNode;
  pathTitleMap: Record<string, string>;
}

const titles: Record<string, string> = {
  "/": "nasjp.dev へようこそ",
  "/about": "nasjp.dev について",
};

export default function ClassicBrowserLayout({
  children,
  pathTitleMap,
}: ClassicBrowserLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#c0c0c0] border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040]">
      <div className="flex items-center px-1 bg-[#000080] border-t border-l border-[#dfdfdf] border-b border-r border-[#808080] text-white text-xs h-6">
        <Link href="/" className="flex items-center gap-1">
          <div className="w-4 h-4 flex items-center justify-center bg-[#008000] border border-black text-white text-[10px]">
            <Orbit className="h-3 w-3" />
          </div>
          <div className="font-bold">nasjp.dev</div>
        </Link>
      </div>

      <div className="flex gap-1 p-1 bg-[#c0c0c0] border-t border-l border-[#dfdfdf] border-b border-r border-[#808080]">
        <Link href="/" passHref>
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6 bg-[#c0c0c0] border-t border-l border-[#dfdfdf] border-b border-r border-[#808080] hover:bg-[#dfdfdf]"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">ホーム</span>
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="icon"
          className="h-6 w-6 bg-[#c0c0c0] border-t border-l border-[#dfdfdf] border-b border-r border-[#808080] hover:bg-[#dfdfdf]"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">検索</span>
        </Button>
      </div>

      <div className="grid gap-0 bg-[#c0c0c0]">
        <div className="flex items-center px-1 py-px border-t border-l border-[#dfdfdf] border-b border-r border-[#808080]">
          <div className="text-xs whitespace-nowrap flex-shrink-0 mr-1">
            Document Title:
          </div>
          <div className="text-xs px-1 flex-1 bg-white border border-[#808080]">
            <p className="text-clip overflow-hidden">
              {pathTitleMap[pathname] ?? titles[pathname] ?? pathname}
            </p>
          </div>
        </div>
        <div className="flex items-center px-1 py-px border-t border-l border-[#dfdfdf] border-b border-r border-[#808080]">
          <div className="text-xs whitespace-nowrap flex-shrink-0 mr-1">
            Document Path:
          </div>
          <div className="text-xs px-1 flex-1 bg-white border border-[#808080]">
            <p className="text-clip overflow-hidden">{pathname}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full bg-[#c0c0c0] border-t border-l border-[#dfdfdf] border-b border-r border-[#808080] p-1 overflow-y-auto">
        <div className="border-t border-l border-white border-b border-r border-[#808080] p-4 w-full min-h-[calc(100vh-150px)]">
          <div className="border-2 border-[#808080] p-4 sm:p-6 md:p-8 bg-[#d4d0c8] w-full max-w-xl mx-auto">
            {children}
          </div>
        </div>
      </div>

      <div className="h-8 bg-[#c0c0c0] border-t border-l border-[#dfdfdf] border-b border-r border-[#808080] flex items-center justify-between px-2">
        <div className="text-[10px]">
          <a
            href="https://github.com/nasjp/nasjp.dev"
            target="_blank"
            rel="noreferrer"
          >
            nasjp.dev
          </a>{" "}
          created by{" "}
          <a href="https://github.com/nasjp" target="_blank" rel="noreferrer">
            nasjp
          </a>
        </div>
        <div className="flex items-center space-x-1">
          <a
            href="https://x.com/nasjp_dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 bg-[#c0c0c0] border-t border-l border-[#dfdfdf] border-b border-r border-[#808080] hover:bg-[#dfdfdf]"
            >
              <svg
                viewBox="0 0 1200 1227"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>X</title>
                <path
                  d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                  fill="black"
                />
              </svg>
            </Button>
          </a>
          <a
            href="https://github.com/nasjp"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 bg-[#c0c0c0] border-t border-l border-[#dfdfdf] border-b border-r border-[#808080] hover:bg-[#dfdfdf]"
            >
              <Github />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
