import cssnanoPresetAdvanced from 'cssnano-preset-advanced';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: [cssnanoPresetAdvanced, {
          discardComments: { removeAll: true },
          reduceIdents: true,
          mergeIdents: true,
          normalizeWhitespace: false,
        }],
      },
    } : {}),
  },
};

export default config;
