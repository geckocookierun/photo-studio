import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { ValidLocale } from "@/lib/i18n/config";
import { localizePathname } from "@/lib/i18n/seo";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cloudinaryFolders = {
  bannerHomepage: "banner-homepage",
  backgroundCardImages: "background-card-images",
  photoRestoration: "photo-restoration",
  professionalProfilePhotos: "professional-profile-photos",
  graduationPhotos: "graduation-photos",
  serviceCoverPhoto: "service-cover-photo",
  idPassportPhoto: {
    "3x4": "id-passport-photo/3x4",
    "3.3x4.8": "id-passport-photo/3.3x4.8",
    "3.5x5": "id-passport-photo/3.5x5",
    "3.5x4.5": "id-passport-photo/3.5x4.5",
    "3.6x4.7": "id-passport-photo/3.6x4.7",
    "4x6": "id-passport-photo/4x6",
    "5x5": "id-passport-photo/5x5",
    "5x7": "id-passport-photo/5x7",
  },
} as const;

export { localizedSlugs as photoServiceUrl } from "@/lib/i18n/paths";

export type CloudinaryImageType = {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
};

const CLOUDINARY_CACHE_SECONDS = 60 * 60 * 24 * 365; // 1 year — refresh by redeploy

type MemoryEntry = { at: number; images: CloudinaryImageType[] };

/** Process-local cache (build workers + warm Worker isolates). */
const memoryFolderCache = new Map<string, MemoryEntry>();
const inflightFolderFetches = new Map<string, Promise<CloudinaryImageType[]>>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchImagesFromFolder(folderName: string): Promise<CloudinaryImageType[]> {
  const cached = memoryFolderCache.get(folderName);
  if (cached && Date.now() - cached.at < CLOUDINARY_CACHE_SECONDS * 1000) {
    return cached.images;
  }

  const inflight = inflightFolderFetches.get(folderName);
  if (inflight) return inflight;

  const promise = (async () => {
    const maxAttempts = 5;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                process.env.CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET
              ).toString("base64")}`,
            },
            body: JSON.stringify({
              expression: `folder:${folderName}`,
              sort_by: [{ created_at: "desc" }],
              max_results: 100,
            }),
            // POST is not Data-Cacheable; persistence comes from unstable_cache / memory.
            cache: "no-store",
          }
        );

        if (response.status === 420 || response.status === 429) {
          if (attempt === maxAttempts) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          await sleep(400 * attempt * attempt);
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const images: CloudinaryImageType[] = data.resources.map((resource: any) => ({
          id: resource.public_id,
          title: resource.filename,
          url: resource.secure_url,
          width: resource.width,
          height: resource.height,
        }));

        memoryFolderCache.set(folderName, { at: Date.now(), images });
        return images;
      } catch (error) {
        if (attempt === maxAttempts) {
          console.error("Error fetching images:", error);
          return memoryFolderCache.get(folderName)?.images ?? [];
        }
        await sleep(400 * attempt * attempt);
      }
    }
    return memoryFolderCache.get(folderName)?.images ?? [];
  })();

  inflightFolderFetches.set(folderName, promise);
  try {
    return await promise;
  } finally {
    inflightFolderFetches.delete(folderName);
  }
}

/** Cross-request cache + per-request dedupe (Header/Footer/Banner share folders). */
export const getImagesFromFolder = cache(async (folderName: string) => {
  return unstable_cache(
    () => fetchImagesFromFolder(folderName),
    [`cloudinary-folder`, folderName],
    {
      revalidate: CLOUDINARY_CACHE_SECONDS,
      tags: [`cloudinary:${folderName}`],
    }
  )();
});

export function getAlternateUrl(lang: string, pathname: string) {
  return localizePathname(pathname, (lang === "vi" ? "vi" : "en") as ValidLocale);
}
