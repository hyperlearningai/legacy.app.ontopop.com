import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import getEdge from '../nodesEdgesUtils/getEdge'

/**
* Get nodes and edges to display from edges filter
 * @param  {Object}   params
 * @param  {Array}    params.edgesFilters              Array of node filters {property [string], value [string]}
 * @return {Object}   output
 * @return {Array}    output.nodesToDisplay            Array of node IDs strings
 */
const getNodesEdgesFromEdgesFilters = ({
  edgesFilters,
}) => {
  const nodesToDisplay = []

  const availableEdgesIds = getEdgeIds()

  if (availableEdgesIds?.length > 0) {
    for (let index = 0; index < availableEdgesIds.length; index++) {
      const edgeId = availableEdgesIds[index]

      const edge = getEdge(edgeId)

      const isDisplayable = edgesFilters.some((filter) => filter.property !== ''
        && filter.value !== ''
        && edge[filter.property]
        && edge[filter.property].toLowerCase().includes(filter.value.toLowerCase()))

      if (isDisplayable) {
        if (!nodesToDisplay.includes(edge.from)) {
          nodesToDisplay.push(edge.from)
        }

        if (!nodesToDisplay.includes(edge.to)) {
          nodesToDisplay.push(edge.to)
        }
      }
    }
  }

  return nodesToDisplay
}

export default getNodesEdgesFromEdgesFilters
