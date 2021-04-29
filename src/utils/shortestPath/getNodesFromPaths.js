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
    const shortestPathResultsLength = shortestPathResults.length - 1

    for (let pathIndex = shortestPathResultsLength; pathIndex >= 0; pathIndex--) {
      const path = shortestPathResults[shortestPathResultsLength - pathIndex]
      const pathEdges = getPathEdges(path)

      if (!pathEdges || pathEdges.length === 0) continue

      const pathEdgesLength = pathEdges.length - 1
      for (let index = pathEdgesLength; index >= 0; index--) {
        const edge = pathEdges[pathEdgesLength - index]

        if (pathEdgesLength - index === 0) {
          shortestPathNodes.push(edge)
          continue
        }

        // eslint-disable-next-line
          const {from, to} = getEdge(edge)

        if (!shortestPathNodes.includes(from)) shortestPathNodes.push(from)
        if (!shortestPathNodes.includes(to)) shortestPathNodes.push(to)
      }
    }
  }

  return shortestPathNodes
}

export default getNodesFromPaths
