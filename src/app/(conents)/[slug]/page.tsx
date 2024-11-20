import { Content } from "@/components/Content";
import { getAllContents, getContentBySlug } from "@/lib/content";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const contents = await getAllContents();
  return contents.map((content) => ({
    slug: content.slug,
  }));
};

export const generateMetadata = async (
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const params = await props.params;
  const content = await getContentBySlug(params.slug);
  if (!content) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${content.title} | nasjp.dev`,
    description: content.excerpt,
  };
};

export default async function Page({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = await getContentBySlug(slug);
  if (!content) {
    return notFound();
  }

  return (
    <>
      <Content content={content} />
    </>
  );
}
