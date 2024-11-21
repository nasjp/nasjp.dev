import type { Content as ContentType } from "@/lib/types";
import Image from "next/image";

interface ContentHeaderProps {
  content: ContentType;
}

export const ContentHeader = async ({ content }: ContentHeaderProps) => {
  const aspectRatio = content.imageHeight / content.imageWidth;

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 pt-8">{content.title}</h2>
      <div className="text-sm text-gray-600 mb-4">
        {content.datetime.toLocaleDateString("ja-JP")}
      </div>
      <div className="relative w-full md:w-2/3 lg:w-1/2 mx-auto mb-4">
        <div
          style={{ paddingTop: `calc(${aspectRatio * 100}% + 8px)` }}
          className="relative bg-[#c0c0c0] border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040] p-1"
        >
          <div className="absolute inset-[3px] overflow-hidden">
            <Image
              src={content.imageUrl}
              alt={content.imageTitle}
              fill
              sizes="(max-width: 768px) calc(100vw - 8px), (max-width: 1024px) calc(66vw - 8px), calc(50vw - 8px)"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="relative bg-[#c0c0c0] border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040] p-1 mb-8 mt-4">
          <div className="text-sm text-gray-600 break-all">
            {content.imageTitle}
            <br />
            {content.imageArtistDisplayName}
            <br />
            {content.imageObjectDate}
          </div>
        </div>
      </div>
    </>
  );
};
