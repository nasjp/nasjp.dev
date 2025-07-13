/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
        }],
      },
    } : {}),
  },
};

export default config;
