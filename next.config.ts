import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Required for static GitHub Pages hosting
  basePath: process.env.GITHUB_PAGES === 'true' ? '/Suryan-Portfolio' : '', // Conditionally apply basePath for GitHub Pages
  images: {
    unoptimized: true, // Required because Next.js image optimization doesn't work on static hosts
  },
};

export default nextConfig;
