import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Required for static GitHub Pages hosting
  basePath: '/Suryan-Portfolio', // Required for GitHub Pages subdirectory
  images: {
    unoptimized: true, // Required because Next.js image optimization doesn't work on static hosts
  },
};

export default nextConfig;
