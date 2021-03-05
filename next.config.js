const withImages = require('next-images')
// const WorkerPlugin = require('worker-plugin')

module.exports = withImages({
  target: 'serverless',
  // future: {
  //   webpack5: true
  // },
  webpack: (config, {
    webpack,
    // isServer
  }) => {
    // if (!isServer) {
    //   config.plugins.push(
    //     new WorkerPlugin({
    //       // use "self" as the global object when receiving hot updates.
    //       globalObject: 'self',
    //     })
    //   )
    // }
    config.plugins.push(new webpack.IgnorePlugin(/\/__test__\//))
    // config.plugins.push(
    //   new webpack.DefinePlugin({
    //     __CLIENT__: true,
    //   })
    // )
    return config
  },
})
