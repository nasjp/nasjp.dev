import { ContentHeader } from "@/components/ContentHeader";
import { Markdown } from "@/components/Markdown";
import type { Content as ContentType } from "@/lib/types";
import Link from "next/link";

interface ContentSummaryProps {
  content: ContentType;
}

export const ContentSummary = async ({ content }: ContentSummaryProps) => {
  return (
    <Link href={`/${content.slug}`} passHref legacyBehavior>
      <div className="hover:bg-gray-100">
        <ContentHeader {...content} />
        <div className="prose max-w-none">
          <Markdown source={content.excerpt} />
          <p>...</p>
        </div>
        <div className="h-12" />
      </div>
    </Link>
  );
};
