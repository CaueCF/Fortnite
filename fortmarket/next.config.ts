import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://fortnite-api.com/**')],
    //domains: ['fortnite-api.com'],
    
  },
};

export default nextConfig;
