import { ContentSummary } from "@/components/ContentSummary";
import { Separator } from "@/components/ui/separator";
import { getAllContents } from "@/lib/content";

export default async function Page() {
  const contents = await getAllContents();

  return (
    <>
      {contents.map((content, index) => (
        <div key={content.slug}>
          <ContentSummary content={content} />
          {index < contents.length - 1 && <Separator className="my-0 py-0" />}
        </div>
      ))}
    </>
  );
}
