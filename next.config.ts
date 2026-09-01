import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nnqvqakjvgevipqheqvt.supabase.co",
        pathname: "/storage/v1/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/**",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/*": [
      "node_modules/sharp/**/*",
      "node_modules/@img/sharp-linux-x64/**/*",
      "node_modules/@img/sharp-libvips-linux-x64/**/*",
      "node_modules/next/node_modules/sharp/**/*",
      "node_modules/next/node_modules/@img/sharp-linux-x64/**/*",
      "node_modules/next/node_modules/@img/sharp-libvips-linux-x64/**/*",
      "media/**/*",
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 10800,
    },
  },
};

export default withPayload(nextConfig);
