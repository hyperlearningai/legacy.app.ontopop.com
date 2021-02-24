import {
  getPathEdges,
} from '../../constants/functions'
import getEdge from '../nodesEdgesUtils/getEdge'

/**
 * Get nodes from shortest path
 * @param  {Object}   params
 * @param  {Array}    params.shortestPathResults Shortest paths
 * @return {Array}    shortestPathNodes          Array of node IDs strings
 */
const getNodesFromPaths = ({
  shortestPathResults
}) => {
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

          // eslint-disable-next-line
          const {from, to} = getEdge(edge)

          if (!shortestPathNodes.includes(from)) shortestPathNodes.push(from)
          if (!shortestPathNodes.includes(to)) shortestPathNodes.push(to)

          return true
        })
      }

      return true
    })
  }

  return shortestPathNodes
}

export default getNodesFromPaths
