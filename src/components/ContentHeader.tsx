import Image from "next/image";

interface ContentHeaderProps {
  title: string;
  datetime: Date;
  imageUrl: string;
  imageTitle: string;
  imageArtistDisplayName: string;
  imageObjectDate: string;
}

export const ContentHeader = async ({
  title,
  datetime,
  imageUrl,
  imageTitle,
  imageArtistDisplayName,
  imageObjectDate,
}: ContentHeaderProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="text-sm text-gray-600">
        {datetime.toLocaleDateString("ja-JP")}
      </div>
      <Image
        src={imageUrl}
        alt={imageTitle}
        width={800}
        height={600}
        className="w-full md:w-1/3 h-auto mx-auto"
      />
      <div className="text-sm text-gray-600">
        {imageTitle} ({imageArtistDisplayName}, {imageObjectDate})
      </div>
    </>
  );
};