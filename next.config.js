const withImages = require('next-images')

module.exports = withImages({
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  target: 'serverless',
  exportPathMap: () => {
    const routes = {
      '/login': { page: '/login' },
      '/profile': { page: '/profile' },
      '/': { page: '/' },
    }

    return routes
  },
  webpack: (config, {
    webpack,
  }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__test__\//))
    return config
  },
})
