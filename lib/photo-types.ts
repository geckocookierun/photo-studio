/** Shared ID photo size list for hub, detail pages, and sitemap. */
export const PHOTO_TYPES = [
  "3x4",
  "3.3x4.8",
  "3.5x4.5",
  "3.5x5",
  "3.6x4.7",
  "4x6",
  "5x5",
  "5x7",
] as const;

export type PhotoTypeId = (typeof PHOTO_TYPES)[number];
