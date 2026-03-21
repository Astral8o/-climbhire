/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lvvfclktjcghqxauohli.supabase.co',
      },
    ],
  },
};

export default nextConfig;
