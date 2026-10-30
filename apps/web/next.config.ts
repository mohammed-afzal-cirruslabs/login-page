import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Transpile workspace packages so Next.js can handle their TypeScript source
  transpilePackages: ['@ecom/ui', '@ecom/db'],

  images: {
    // Add your CDN / S3 domains here as the project grows
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },

  // Strict mode catches double-render bugs early
  reactStrictMode: true,

  // Expose only explicitly listed env vars to the browser
  // (DATABASE_URL and secrets must NEVER appear here)
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  },
}

export default nextConfig
