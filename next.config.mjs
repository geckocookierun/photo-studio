/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Fewer parallel prerenders → fewer Cloudinary Admin API bursts (420 rate limits)
  experimental: {
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async redirects() {
    return [
      // Legacy /vi /en prefixes → clean public paths (locale comes from domain)
      { source: "/vi", destination: "/", permanent: true },
      { source: "/vi/:path*", destination: "/:path*", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },

  async rewrites() {
    // Public VI slugs → internal English folder names
    return [
      {
        source: "/anh-the-ho-chieu",
        destination: "/id-photos",
      },
      {
        source: "/anh-the-ho-chieu/:path*",
        destination: "/id-photos/:path*",
      },
      {
        source: "/anh-ho-so-chuyen-nghiep",
        destination: "/professional-profile-photos",
      },
      {
        source: "/chup-anh-tot-nghiep",
        destination: "/graduation-photos",
      },
      {
        source: "/phuc-hoi-anh-cu",
        destination: "/photo-restoration",
      },
      // EN public aliases (same folders)
      {
        source: "/id-passport-photos",
        destination: "/id-photos",
      },
      {
        source: "/id-passport-photos/:path*",
        destination: "/id-photos/:path*",
      },
    ];
  },
};

export default nextConfig;
