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

/**
 * Insert Cloudinary transforms into an existing delivery URL.
 * Avoids re-parsing/encoding Unicode public_ids (which broke BÌA cover).
 */
function buildOptimizedUrl(
  src: string,
  width: number,
  height: number,
  quality: number | `${number}` | "auto"
): string {
  const q =
    typeof quality === "number"
      ? `q_${quality}`
      : quality === "auto"
        ? "q_auto"
        : `q_${quality}`;
  const transforms = `c_fill,w_${width},h_${height},g_auto,f_auto,${q}`;

  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    // Drop a previous transform segment (comma-separated) if present, keep version + public_id
    const withoutOld = src.replace(
      /\/upload\/(?:[^/]*,[^/]*\/)+/,
      "/upload/"
    );
    return withoutOld.replace("/upload/", `/upload/${transforms}/`);
  }

  return getCldImageUrl({
    src,
    width,
    height,
    crop: "fill",
    gravity: "auto",
    quality,
    format: "auto",
  });
}

/**
 * Server Component — optimized Cloudinary URLs via next/image
 * without shipping next-cloudinary client JS.
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

  const url = buildOptimizedUrl(src, width, height, quality);

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      priority={priority}
      sizes={sizes}
      unoptimized
      loading={priority ? "eager" : "lazy"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
    />
  );
}
