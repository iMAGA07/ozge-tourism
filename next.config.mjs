/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1600, 1920, 2048, 2560],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};
export default nextConfig;
