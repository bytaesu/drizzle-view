import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_DRIZZLE_STUDIO_URL: process.env.DRIZZLE_STUDIO_URL,
    NEXT_PUBLIC_DRIZZLE_VISUALIZER_URL: process.env.DRIZZLE_VISUALIZER_URL,
  },
};

export default nextConfig;
