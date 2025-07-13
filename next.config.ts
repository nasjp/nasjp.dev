import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // JavaScript最適化設定
  productionBrowserSourceMaps: false,
  // バンドルサイズ最適化
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // ツリーシェイキングの最適化（プロダクションビルドでのみ有効）
      config.optimization.sideEffects = false;
    }
    return config;
  },
};

export default nextConfig;