import crypto from "node:crypto";
import metmuseumObjectIds from "@/lib/metmuseumObjectIds.json";
import sharp from "sharp";

export const genMetmuseumObjectId = (input: string): string => {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  const seed = Number.parseInt(hash.slice(0, 8), 16);
  const index = seed % metmuseumObjectIds.objectIDs.length;
  return metmuseumObjectIds.objectIDs[index].toString();
};

interface MetmuseumObject {
  objectID: string;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  primaryImage: string;
  isPublicDomain: boolean;
  imageWidth: number;
  imageHeight: number;
}

export const getImageData = async (
  objectId: string,
): Promise<MetmuseumObject> => {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
  );
  const data = await response.json();

  const imageResponse = await fetch(data.primaryImage);
  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const metadata = await sharp(buffer).metadata();
  const imageWidth = metadata.width;
  const imageHeight = metadata.height;

  if (!imageWidth || !imageHeight) {
    throw new Error("Image width or height is undefined");
  }

  return {
    objectID: data.objectID,
    title: data.title || "Untitled",
    artistDisplayName: data.artistDisplayName || "Unknown",
    objectDate: data.objectDate || "Unknown",
    primaryImage: data.primaryImage || "",
    isPublicDomain: data.isPublicDomain,
    imageWidth,
    imageHeight,
  };
};
