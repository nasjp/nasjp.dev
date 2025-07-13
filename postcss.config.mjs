import cssnanoPresetAdvanced from 'cssnano-preset-advanced';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: [cssnanoPresetAdvanced, {
          discardComments: { removeAll: true },
          reduceIdents: true,
          mergeIdents: true,
          normalizeWhitespace: true,
        }],
      },
    } : {}),
  },
};

export default config;
