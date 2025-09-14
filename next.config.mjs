/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mahitiinmarathi.in',
        port: '',
        pathname: '/staging/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
