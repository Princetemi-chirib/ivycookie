import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "peru-elk-388931.hostingersite.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;