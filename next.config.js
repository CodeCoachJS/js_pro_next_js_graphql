/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com']
  },
  env: {
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN
  }
};

module.exports = nextConfig;
