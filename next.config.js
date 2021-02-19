const withImages = require('next-images')

module.exports = withImages({
  target: 'serverless',
  env: {
    endpointUrl: 'http://localhost:8080',
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__test__\//))
    return config
  },
})
