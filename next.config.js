/** @type {import('next').NextConfig} */
const nextConfig = {
  secret: process.env.SECRET,

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
