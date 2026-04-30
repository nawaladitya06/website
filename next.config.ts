import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  import("@cloudflare/next-on-pages/next-dev").then(({ setupDevPlatform }) => {
    setupDevPlatform();
  });
}

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
