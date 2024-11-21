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
        <p>
          nasjp.devへようこそ。これは、ただの個人的なブログであり、特に意味深い目的があるわけではありません。このデザインは、NCSA
          Mosaicというインターネット初期のブラウザを参考にしていますが、私がMosaicのローンチをリアルタイムで体験しているわけではありません。それどころか、Mosaicが世に出た時、私はまだ生まれてもいませんでした。そのため、このデザインに特別な思い入れがあるわけでもなく、軽い気持ちで作ったものです。
          このブログは、私自身の技術的な試行錯誤や思いつきを気軽にまとめる場所として作りました。
        </p>

        <p className="italic">nasjp.devの記事は下記から閲覧できます。</p>

        <div className="mt-8">
          <div className="font-bold mb-2">nasjp.devの記事:</div>
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
