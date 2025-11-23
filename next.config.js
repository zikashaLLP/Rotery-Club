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
        hostname: '193.203.161.3',
        port: '5152',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'https://193.203.161.3:5152',
  },
}

module.exports = nextConfig

