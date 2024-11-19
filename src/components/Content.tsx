import { ContentHeader } from "@/components/ContentHeader";
import { Markdown } from "@/components/Markdown";
import type { Content as ContentType } from "@/lib/types";

interface ContentProps {
  content: ContentType;
}

export const Content = async ({ content }: ContentProps) => {
  return (
    <>
      <div className="space-y-6">
        <ContentHeader {...content} />
        <div className="prose max-w-none">
          <Markdown source={content.content} />
        </div>
      </div>
    </>
  );
};
