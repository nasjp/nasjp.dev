import { ContentHeader } from "@/components/ContentHeader";
import { Markdown } from "@/components/Markdown";
import type { Content as ContentType } from "@/lib/types";

interface ContentProps {
  content: ContentType;
}

export const Content = async ({ content }: ContentProps) => {
  return (
    <div className="w-full">
      <ContentHeader content={content} />
      <div className="prose-sm">
        <Markdown source={content.content} />
      </div>
    </div>
  );
};
