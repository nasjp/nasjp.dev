import { Button } from "@/components/ui/button";
import { getAllContents } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const contents = await getAllContents();
  const mainArticle = contents[0];
  const secondaryArticle = contents[1];

  return (
    <div className="max-w-5xl mx-auto p-4 font-serif">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <Link href="#" className="flex-shrink-0">
          <div className="border border-black p-2 text-center">
            <div className="text-xs font-bold">NEW</div>
            <div className="text-sm font-bold">AUTO</div>
            <div className="text-xs">CLASSIFIEDS</div>
          </div>
        </Link>

        <h1 className="text-4xl font-bold text-center mx-4">nasjp.dev</h1>

        <Link href="#" className="flex-shrink-0">
          <Image
            src="/nasjp.png"
            alt="NASJP"
            width={60}
            height={60}
            className="border border-black"
          />
        </Link>
      </div>

      <div className="text-center italic mb-4">
        To improve is to change; to be perfect is to change often.
      </div>

      <div className="text-center mb-4">
        {new Date().toLocaleDateString("ja-JP", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      {/* メインコンテンツ */}
      <div className="space-y-8">
        {/* メインニュース */}
        <div className="space-y-4">
          <div className="grid gap-4">
            <Image
              src={mainArticle.imageUrl}
              alt={mainArticle.imageTitle}
              width={800}
              height={600}
              className="w-1/2"
            />
            <div className="text-sm">{mainArticle.imageTitle}</div>
          </div>

          <div>
            <div className="text-red-800 font-bold mb-2">最新ニュース速報</div>
            <h2 className="text-xl font-bold mb-2">{mainArticle.title}</h2>
            <p>{mainArticle.excerpt}</p>
          </div>

          <div>
            <div className="text-red-800 font-bold mb-2">CYBERTIMES</div>
            <h2 className="text-xl font-bold">{secondaryArticle.title}</h2>
            <p>{secondaryArticle.excerpt}</p>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="mt-8 text-center space-y-4">
        <div className="flex justify-center gap-4">
          <Link href="#" className="text-blue-600 hover:underline">
            ヘルプセンター
          </Link>
          <span>|</span>
          <Link href="#" className="text-blue-600 hover:underline">
            低画質版
          </Link>
        </div>

        <div className="text-sm">
          このラインの幅にウィンドウを合わせてください
        </div>

        <div>
          <Link href="#" className="text-blue-600 hover:underline">
            Copyright {new Date().getFullYear()} The New York Times
          </Link>
        </div>
      </div>
    </div>
  );
}
