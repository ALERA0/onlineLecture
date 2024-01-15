/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_JWT_SECRET_KEY: process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  
};



module.exports = withNextIntl(nextConfig);
