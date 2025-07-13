import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'],
  },
  // JavaScript最適化設定
  productionBrowserSourceMaps: true,
  // 実験的機能
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  // 圧縮設定
  compress: true,
  // バンドルサイズ最適化
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // ツリーシェイキングの最適化
      config.optimization.sideEffects = false;
      
      // プロダクションビルドでの追加最適化
      if (!dev) {
        config.optimization.minimize = true;
        config.optimization.moduleIds = 'deterministic';
        config.optimization.splitChunks = {
          chunks: 'all',
          minSize: 20000,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
          },
        };
      }
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);