import { ContentHeader } from "@/components/ContentHeader";
import { Markdown } from "@/components/Markdown";
import type { Content as ContentType } from "@/lib/types";
import Link from "next/link";

interface ContentSummaryProps {
  content: ContentType;
}

export const ContentSummary = async ({ content }: ContentSummaryProps) => {
  return (
    <>
      <div className="space-y-6">
        <ContentHeader {...content} />
        <div className="prose max-w-none">
          <Markdown source={content.excerpt} />
          <p>...</p>
          <div className="text-right">
            <Link href={`/${content.slug}`}>よむ?</Link>
          </div>
        </div>
      </div>
    </>
  );
};
