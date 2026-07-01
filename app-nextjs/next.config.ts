import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/foodmap",
  assetPrefix: "/foodmap/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
