import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getContentBySlug, getContentSlugs } from "../lib/content";
import { getImageData } from "../lib/metmuseum";
const publicDirectory = path.join(process.cwd(), "public");
const imagesDirectory = path.join(publicDirectory, "contents", "images");

const imageDataPath = path.join(process.cwd(), "src", "lib", "imageData.json");

async function downloadAndProcessImage(
  url: string,
  filepath: string,
): Promise<{ width: number; height: number }> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const buffer = await response.arrayBuffer();

  const image = sharp(Buffer.from(buffer));
  const metadata = await image.metadata();

  await image.toFile(filepath);

  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
  };
}

async function saveContentImages(): Promise<void> {
  try {
    if (!fs.existsSync(imagesDirectory)) {
      fs.mkdirSync(imagesDirectory, { recursive: true });
    }

    // Load existing imageData if it exists
    let imageData: Record<string, { width: number; height: number }> = {};
    if (fs.existsSync(imageDataPath)) {
      const existingData = fs.readFileSync(imageDataPath, "utf-8");
      imageData = JSON.parse(existingData);
      console.log("Loaded existing image data.");
    }

    const slugs = getContentSlugs();

    for (const slug of slugs) {
      if (imageData[slug]) {
        console.log(`Image for ${slug} already exists. Skipping...`);
        continue;
      }

      const content = await getContentBySlug(slug);
      if (!content) {
        console.error(`Content not found for slug: ${slug}`);
        continue;
      }

      const newImageData = await getImageData(content.imageObjectID);
      const imagePath = path.join(imagesDirectory, `${content.slug}.jpg`);
      const { width, height } = await downloadAndProcessImage(
        newImageData.primaryImage,
        imagePath,
      );

      imageData[slug] = { width, height };
    }

    // Save updated image data to JSON file
    fs.writeFileSync(imageDataPath, JSON.stringify(imageData, null, 2));
    console.log(`Image data saved to ${imageDataPath}`);

    console.log("All images have been processed successfully.");
  } catch (error) {
    console.error("An error occurred while processing images:", error);
  }
}

saveContentImages();
