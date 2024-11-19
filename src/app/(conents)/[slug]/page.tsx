import Content from "@/components/Content";
import { getAllContents, getContentBySlug } from "@/lib/content";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const contents = await getAllContents();
  return contents.map((content) => ({
    slug: content.slug,
  }));
};

export const generateMetadata = async (
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const content = await getContentBySlug(params.slug);
  if (!content) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${content.title} | nasjp's website`,
    description: content.excerpt,
  };
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
}

// export default async function Page({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = await params;

//   const content = await getContentBySlug(slug);
//   if (!content) {
//     return notFound();
//   }

//   return (
//     <div className="w-full max-w-xl">
//       <div className="relative w-full max-w-screen-xl">
//         <Image
//           src={content.imageUrl}
//           alt={content.title}
//           width={1080}
//           height={1920}
//           className="w-full h-auto object-contain"
//           priority
//           placeholder="blur"
//           blurDataURL={"/blur.png"}
//         />
//         <div className="py-2">
//           <div className="text-xs font-mono">
//             {content.imageTitle}
//             {content.imageArtistDisplayName !== "Unknown" &&
//               ` by ${content.imageArtistDisplayName}`}
//           </div>
//           <div className="text-xs font-mono">{content.imageObjectDate}</div>
//         </div>
//       </div>
//       <div className="border-y border-black border-t-2 py-2 md:my-8">
//         <p className="text-sm text-gray-600 font-thin underline capitalize">
//           {content.category}
//         </p>
//         <h1 className="font-bold my-2">{content.title}</h1>
//         <p className="text-gray-600 text-sm whitespace-nowrap">
//           {content.datetime.toISOString()}
//         </p>
//       </div>
//       <Content source={content.content} />
//     </div>
//   );
// }
