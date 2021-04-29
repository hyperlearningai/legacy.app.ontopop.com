import getNode from '../nodesEdgesUtils/getNode'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'

/**
* Get nodes to display from nodes filter
 * @param  {Object}   params
 * @param  {Array}    params.nodesFilters              Array of node filters {property [string], value [string]}
 * @return {Array}    nodesToDisplay                   Array of node IDs strings
 */
const getNodesFromNodesFilters = ({
  nodesFilters
}) => {
  const nodesToDisplay = []

  const availableNodesIds = getNodeIds()

  if (availableNodesIds.length > 0) {
    const availableNodesIdsLength = availableNodesIds.length - 1
    for (let index = availableNodesIdsLength; index >= 0; index--) {
      const nodeId = availableNodesIds[availableNodesIdsLength - index]

      for (let propertyIndex = nodesFilters.length - 1; propertyIndex >= 0; propertyIndex--) {
        const { property, value } = nodesFilters[propertyIndex]

        if (property === '') continue
        if (value === '') continue

        const nodeObject = getNode(nodeId)

        const isNodeToBeAdded = nodeObject[property]
          && nodeObject[property].toLowerCase().includes(value.toLowerCase())

        if (isNodeToBeAdded) {
          nodesToDisplay.push(nodeId)
          break
        }
      }
    }
  }

  return nodesToDisplay
}

export default getNodesFromNodesFilters
