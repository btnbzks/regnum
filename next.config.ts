import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site tamamen statik; Cloudflare Pages'e düz HTML olarak çıkar.
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
