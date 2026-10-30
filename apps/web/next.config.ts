import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@ecom/ui'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
