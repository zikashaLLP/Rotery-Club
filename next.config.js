/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rotaryvisnagarapi.zikasha.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'https://rotaryvisnagarapi.zikasha.com',
  },
}

module.exports = nextConfig

