import fs from "node:fs";
import path from "node:path";
import { genMetmuseumObjectId, getImageData } from "@/lib/metmuseum";
import type { Content, ContentType, StatusType } from "@/lib/types";
import matter from "gray-matter";

interface ImageSize {
  [key: string]: {
    width: number;
    height: number;
  };
}

const containsDraft = process.env.NEXT_PUBLIC_CONTAINS_DRAFT === "true";

const contentsDirectory = path.join(process.cwd(), "contents");

export const getContentSlugs = (): string[] => {
  return fs.readdirSync(contentsDirectory);
};

export const getContentBySlug = async (
  slug: string,
): Promise<Content | null> => {
  if (slug === "") {
    console.error("Slug is undefined");
    return null;
  }

  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(contentsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content, excerpt } = matter(fileContents, {
    excerpt_separator: "\n\n",
  });

  const imageData = await getImageData(genMetmuseumObjectId(realSlug));

  const title = (data.title as string) || realSlug;
  const category = (data.category as ContentType) || "articles";
  const status = (data.status as StatusType) || "archived";
  const date = new Date(data.datetime) || new Date();
  return {
    slug: realSlug,
    title: title,
    datetime: date,
    category: category,
    status: status,
    content: content,
    excerpt: excerpt || "",
    imageObjectID: imageData.objectID,
    imageTitle: imageData.title,
    imageArtistDisplayName: imageData.artistDisplayName,
    imageObjectDate: imageData.objectDate,
    imageIsPublicDomain: imageData.isPublicDomain,
    rawImageUrl: imageData.primaryImage,
    imageUrl: `/contents/images/${realSlug}.jpg`,
    imageWidth: imageData.imageWidth,
    imageHeight: imageData.imageHeight,
  };
};

export const getAllContents = async (): Promise<Content[]> => {
  const slugs = getContentSlugs();
  const contents = (
    await Promise.all(slugs.map((slug) => getContentBySlug(slug)))
  )
    .filter((content): content is Content => content !== null)
    .filter((content) => containsDraft || content.status === "published")
    .sort((content1, content2) =>
      content1.datetime > content2.datetime ? -1 : 1,
    );
  return contents;
};

export const getThreeContents = async (): Promise<Content[]> => {
  const contents = await getAllContents();
  return contents.slice(0, 3);
};

export const getPathTitleMap = async (): Promise<Record<string, string>> => {
  const contents = await getAllContents();
  return contents.reduce(
    (acc, content) => {
      acc[`/${content.slug}`] = content.title;
      return acc;
    },
    {} as Record<string, string>,
  );
};
