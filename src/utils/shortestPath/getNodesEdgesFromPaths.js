import {
  getPathEdges,
  getEdgeAndNodes
} from '../../constants/functions'
import store from '../../store'

/**
 * Get nodes edges from shortest path
 * @return {Object}   output
 * @return {Array}    output.shortestPathEdges          Array of edges IDs strings
 * @return {Array}    output.shortestPathNodes          Array of node IDs strings
 */
const getNodesEdgesFromPaths = () => {
  const {
    shortestPathResults
  } = store.getState()

  const shortestPathEdges = []
  const shortestPathNodes = []

  if (shortestPathResults?.length > 0) {
    shortestPathResults.map((path) => {
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