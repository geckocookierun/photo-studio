"use client";

import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number | `${number}` | "auto";
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
}

export function CloudinaryImage({
  src,
  alt,
  width = 600,
  height = 800,
  className,
  priority = false,
  quality = 70,
  sizes = "(max-width: 768px) 100vw, 600px",
  fetchPriority,
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      priority={priority}
      crop="fill"
      gravity="auto"
      dpr="auto"
      format="auto"
      quality={quality}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
    />
  );
}
