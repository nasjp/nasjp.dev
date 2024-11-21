import { Logo } from "@/components/Logo";
import { getAllContents } from "@/lib/content";
import Link from "next/link";

export default async function Page() {
  const articles = await getAllContents();
  return (
    <>
      <div className="flex justify-center items-center">
        <Logo className="p-4 max-w-96 w-full" />
      </div>

      <div className="space-y-4 text-sm">
        <p>こんにちは、nasjp.devです。</p>
        <p>
          <span className="font-bold">ソフトウェアエンジニア</span>
          として7年間の経験を積み、現在は株式会社コルモアナでCTOを務めています。
        </p>
        <p>
          これまでに、生体認証を活用した本人確認サービスを提供するLiquidにて、「認証を空気化する」というミッションを掲げ、サービスのローンチから上場までを経験しました。
        </p>
        <p>
          WEBアプリケーションの<span className="font-bold">0から1</span>
          の開発が最も得意です。
        </p>
        <p>
          シンプルで効果的な技術を通じて、新しい価値を生み出すことを目指しています。
        </p>

        <div className="mt-8">
          <div className="font-bold mb-2">連絡先</div>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <a
                href="mailto:y.softvalley@gmail.com"
                className="text-blue-600 hover:underline"
              >
                y.softvalley@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <div className="font-bold mb-2">nasjp.devについて</div>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <Link href="/portfolio" className="text-blue-600 hover:underline">
                ポートフォリオ
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <div className="font-bold mb-2">記事</div>
          <ul className="list-disc pl-6 space-y-1">
            {articles.map((article) => (
              <li key={article.slug} className="text-blue-600 hover:underline">
                <Link href={`/${article.slug}`}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
