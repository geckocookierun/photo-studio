import { cn } from "@/lib/utils";
import { getCldImageUrl } from "next-cloudinary";
import Image from "next/image";

interface CloudinaryImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number | `${number}` | "auto";
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
}

/** Turn a Cloudinary delivery URL into a public_id for transforms. */
function toPublicId(src: string): string {
  if (!src.includes("res.cloudinary.com") && !src.includes("/upload/")) {
    return src.replace(/\.[a-zA-Z0-9]+$/, "");
  }
  try {
    const pathname = new URL(src).pathname;
    const afterUpload = pathname.split("/upload/")[1];
    if (!afterUpload) return src;
    return afterUpload.replace(/^v\d+\//, "").replace(/\.[a-zA-Z0-9]+$/, "");
  } catch {
    return src;
  }
}

/**
 * Server Component — serves optimized Cloudinary URLs via next/image
 * without shipping next-cloudinary client JS (big TBT win).
 */
export function CloudinaryImage({
  src,
  alt = "",
  width = 600,
  height = 800,
  className,
  priority = false,
  quality = 70,
  sizes = "(max-width: 768px) 100vw, 600px",
  fetchPriority,
}: CloudinaryImageProps) {
  if (!src) return null;

  const url = getCldImageUrl({
    src: toPublicId(src),
    width,
    height,
    crop: "fill",
    gravity: "auto",
    quality,
    format: "auto",
  });

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      priority={priority}
      sizes={sizes}
      // Load straight from Cloudinary CDN (skip Vercel image proxy hop)
      unoptimized
      loading={priority ? "eager" : "lazy"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
    />
  );
}
