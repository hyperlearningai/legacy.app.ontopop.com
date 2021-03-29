const withImages = require('next-images')

module.exports = withImages({
  target: 'serverless',
  webpack: (config, {
    webpack,
  }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__test__\//))

    return config
  },
  trailingSlash: false, // true,
  exportPathMap: () => {
    const subroutesObject = {}

    const subroutes = [
      'search',
      'network-graphs',
      'network-graph-options',
      'free-text-search',
      'structured-search',
      'nodes-selection',
      'edges-selection',
      'nodes-filter',
      'edges-filter',
      'bounding-box',
      'node-neighbourhood',
      'shortest-path',
      'settings',
      'styling',
      'notes',
      'synonyms',
      'export',
      'custom-query',
      'edit-ontology'
    ]
    
    subroutes.forEach((view) => {
      const route = `/${view}`

      subroutesObject[view] = {
        page: route, 
        query: { view }
      }    
    })

    return ({
    '/login': { page: '/login' },
    '/profile': { page: '/profile' },
    '/': { page: '/' },
    ...subroutesObject
    // '/search': { page: '/search', query: { view: 'search' } },
    // '/network-graphs': { page: '/network-graphs', query: { view: 'network-graphs' } },
    // '/network-graph-options': { page: '/network-graph-options', query: { view: 'network-graph-options' } },
    // '/free-text-search': { page: '/free-text-search', query: { view: 'free-text-search' } },
  })}
})
