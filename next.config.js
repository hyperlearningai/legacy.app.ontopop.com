const withImages = require('next-images')

module.exports = withImages({
  target: 'serverless',
  trailingSlash: true, // true,
  exportPathMap: () => {
    const dynamicRoutes = [
      '/search',
      '/network-graphs',
      '/network-graph-options',
      '/free-text-search',
      '/structured-search',
      '/nodes-selection',
      '/edges-selection',
      '/nodes-filter',
      '/edges-filter',
      '/bounding-box',
      '/node-neighbourhood',
      '/shortest-path',
      '/settings',
      '/styling',
      '/notes',
      '/synonyms',
      '/export',
      '/custom-query',
      '/edit-ontology'
    ]

    const routes = {
      '/login': { page: '/login' },
      '/profile': { page: '/profile' },
      '/': { page: '/' },
    }

    dynamicRoutes.forEach((route) => {
      const view = route.replace('/', '')

      routes[`${route}`] = {
        page: '/[view]',
        query: { view }
      }
    })

    return routes
  },
  webpack: (config, {
    webpack,
  }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__test__\//))
    return config
  },
})
