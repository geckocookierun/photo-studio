/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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

  async rewrites() {
    // Internal paths still use /vi and /en after middleware rewrite
    return [
      {
        source: "/vi/anh-the-ho-chieu/:path*",
        destination: "/vi/id-photos/:path*",
      },
      {
        source: "/en/id-passport-photos/:path*",
        destination: "/en/id-photos/:path*",
      },
      {
        source: "/vi/anh-ho-so-chuyen-nghiep",
        destination: "/vi/professional-profile-photos",
      },
      {
        source: "/vi/chup-anh-tot-nghiep",
        destination: "/vi/graduation-photos",
      },
      {
        source: "/vi/phuc-hoi-anh-cu",
        destination: "/vi/photo-restoration",
      },
    ];
  },
};

export default nextConfig;
