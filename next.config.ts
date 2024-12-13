import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.modules.push(__dirname + '/src');
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/authenticate",
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
