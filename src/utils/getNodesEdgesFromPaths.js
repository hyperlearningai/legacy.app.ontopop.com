import {
  getPathEdges,
  getEdgeAndNodes
} from '../constants/functions'

/**
 * Get shortest path
 * @param  {Object}   params
 * @param  {Array}    params.paths                      Array of strings with concatenated nodes and edges
 * @return {Object}   output
 * @return {Array}    output.shortestPathEdges          Array of edges IDs strings
 * @return {Array}    output.shortestPathNodes          Array of node IDs strings
 */
const getNodesEdgesFromPaths = ({
  paths
}) => {
  const shortestPathEdges = []
  const shortestPathNodes = []

  if (paths?.length > 0) {
    paths.map((path) => {
      const pathEdges = getPathEdges(path)

      if (pathEdges?.length > 0) {
        pathEdges.map((edge, index) => {
          // first value of pathEdges is actually the start node
          if (index === 0) {
            return shortestPathNodes.push(edge)
          }

          const [edgeUniqueId, from, to] = getEdgeAndNodes(edge)

          if (!shortestPathEdges.includes(edgeUniqueId)) shortestPathEdges.push(edgeUniqueId)
          if (!shortestPathNodes.includes(from)) shortestPathNodes.push(from)
          if (!shortestPathNodes.includes(to)) shortestPathNodes.push(to)

          return true
        })
      }

      return true
    })
  }

  return {
    shortestPathEdges,
    shortestPathNodes
  }
}

export default getNodesEdgesFromPaths
