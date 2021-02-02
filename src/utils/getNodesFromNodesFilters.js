import store from '../store'

/**
* Get shortest path
 * @param  {Object}   params
 * @param  {Array}    params.nodesFilters              Array of node filters {property [string], value [string]}
 * @return {Array}    nodesToDisplay                   Array of node IDs strings
 */
const getNodesFromNodesFilters = ({
  nodesFilters
}) => {
  const {
    availableNodesNormalised,
  } = store.getState()

  const nodesToDisplay = []

  const availableNodesIds = Object.keys(availableNodesNormalised)

  if (availableNodesIds?.length > 0) {
    for (let index = 0; index < availableNodesIds.length; index++) {
      const nodeId = availableNodesIds[index]

      for (let propertyIndex = 0; propertyIndex < nodesFilters.length; propertyIndex++) {
        const { property, value } = nodesFilters[propertyIndex]

        if (property === '') continue
        if (value === '') continue

        const isNodeToBeAdded = (availableNodesNormalised[nodeId][property]
        && availableNodesNormalised[nodeId][property].toLowerCase().includes(value.toLowerCase())) || (
          availableNodesNormalised[nodeId].owlAnnotationProperties[property]
        && availableNodesNormalised[nodeId].owlAnnotationProperties?.[property].toLowerCase().includes(value.toLowerCase()))

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
