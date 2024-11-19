import { ContentSummary } from "@/components/ContentSummary";
import { Separator } from "@/components/ui/separator";
import { getThreeContents } from "@/lib/content";

export default async function Page() {
  const contents = await getThreeContents();

  return (
    <>
      <div className="space-y-8">
        {contents.map((content, index) => (
          <div key={content.slug}>
            <ContentSummary content={content} />
            {index < contents.length - 1 && (
              <div className="pt-12 pb-8">
                <Separator />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
