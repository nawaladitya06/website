/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    unoptimized: true,
  },
  // Ensure we don't have 'output: export' which breaks dynamic SSR on Cloudflare
  // output: 'standalone', // OpenNext handles this, usually not needed explicitly
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
