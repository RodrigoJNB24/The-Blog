import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  cacheLife: {
    seconds: {
      stale: 0,
      revalidate: 300,
      expire: 300,
    }
  }
};

export default nextConfig;
