const bundleAnalyzer = require('@next/bundle-analyzer');
const DotEnv = require('dotenv');
const withImages = require('next-images')

DotEnv.config();

const {
  ANALYZE,
  ENVIRONMENT
} = process.env;

const withBundleAnalyzer = bundleAnalyzer({
  enabled: ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withImages({
  target: 'serverless',
  assetPrefix: ENVIRONMENT,
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__test__\//));
    return config;
  },
}));
