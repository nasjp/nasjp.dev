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
      <h2 className="text-3xl font-bold mb-4 pt-8">{title}</h2>
      <div className="text-sm text-gray-600 mb-4">
        {datetime.toLocaleDateString("ja-JP")}
      </div>
      <Image
        src={imageUrl}
        alt={imageTitle}
        width={400}
        height={400}
        className="max-w-96 w-full mx-auto"
      />
      <div className="text-sm text-gray-600 mb-8">
        {imageTitle} ({imageArtistDisplayName}, {imageObjectDate})
      </div>
    </>
  );
};
