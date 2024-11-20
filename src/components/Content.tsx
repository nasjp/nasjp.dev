import { ContentHeader } from "@/components/ContentHeader";
import { Markdown } from "@/components/Markdown";
import type { Content as ContentType } from "@/lib/types";

interface ContentProps {
  content: ContentType;
}

export const Content = async ({ content }: ContentProps) => {
  return (
    <>
      <ContentHeader {...content} />
      <div className="prose max-w-none">
        <Markdown source={content.content} />
      </div>
    </>
  );
};
