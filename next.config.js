const withImages = require('next-images')

module.exports = withImages({
  target: 'serverless', // 'serverless',
  // trailingSlash: false, // true,
  redirects: async () => [
    {
      source: '/_error',
      destination: '/search',
      permanent: false
    },
  ],
  exportPathMap: () => {
    // const dynamicRoutes = [
    //   '/search',
    //   // '/network-graphs',
    //   // '/network-graph-options',
    //   // '/free-text-search',
    //   // '/structured-search',
    //   // '/nodes-selection',
    //   // '/edges-selection',
    //   // '/nodes-filter',
    //   // '/edges-filter',
    //   // '/bounding-box',
    //   // '/node-neighbourhood',
    //   // '/shortest-path',
    //   // '/settings',
    //   // '/styling',
    //   // '/notes',
    //   // '/synonyms',
    //   // '/export',
    //   // '/custom-query',
    //   // '/edit-ontology'
    // ]

    const routes = {
      '/login': { page: '/login' },
      '/profile': { page: '/profile' },
      '/': { page: '/' },
      // '/app/:slug': { page: '/app/[...slug]' }
    }

    // dynamicRoutes.forEach((route) => {
    //   // const view = route.replace('/', '')

    //   routes[`${route}`] = {
    //       page: 'route'
    //   }

    //   // routes[`/app${route}`] = {
    //   //   page: '/app/[view]',
    //   //   query: { view }
    //   // }
    // })

    return routes
  },
  webpack: (config, {
    webpack,
  }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__test__\//))
    return config
  },
})
