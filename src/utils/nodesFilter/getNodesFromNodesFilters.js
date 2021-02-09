import store from '../../store'

/**
* Get nodes to display from nodes filter
 * @param  {Object}   params
 * @param  {Array}    params.nodesFilters              Array of node filters {property [string], value [string]}
 * @return {Array}    nodesToDisplay                   Array of node IDs strings
 */
const getNodesFromNodesFilters = ({
  nodesFilters
}) => {
  const {
    availableNodes
  } = store.getState()

  const nodesToDisplay = []

  const availableNodesIds = availableNodes.getIds()

  if (availableNodesIds.length > 0) {
    for (let index = 0; index < availableNodesIds.length; index++) {
      const nodeId = availableNodesIds[index]

      for (let propertyIndex = 0; propertyIndex < nodesFilters.length; propertyIndex++) {
        const { property, value } = nodesFilters[propertyIndex]

        if (property === '') continue
        if (value === '') continue

        const nodeObject = availableNodes.get(nodeId)

        const isNodeToBeAdded = (nodeObject[property]
        && nodeObject[property].toLowerCase().includes(value.toLowerCase())) || (
          nodeObject.owlAnnotationProperties[property]
        && nodeObject.owlAnnotationProperties?.[property].toLowerCase().includes(value.toLowerCase()))

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
