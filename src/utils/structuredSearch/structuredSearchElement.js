import store from '../../store'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'

/**
 * Structured search in elements' properties
 * @param  {Object}   params
 * @param  {String}   params.queryLogic              Search logic
 * @param  {Array}    params.filters                 Search filters
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const structuredSearchElement = ({
  filters,
  queryLogic,
  setStoreState,
}) => {
  const {
    classesFromApi,
    objectPropertiesFromApi,
  } = store.getState()

  const elementsToDisplay = {}

  if (filters.length < 2) return false

  const filtersToUse = filters.filter((filter) => filter.property !== '' && filter.value !== '')

  if (filtersToUse.length < 1) return false

  const nodeIds = getNodeIds()

  const filterFunction = (filter, element) => {
    const { property, value } = filter

    return element[property] && element[property].toString().toLowerCase().includes(value.toLowerCase())
  }

  if (nodeIds.length > 0) {
    for (let index = 0; index < nodeIds.length; index++) {
      const nodeId = nodeIds[index]
      const nodeElement = classesFromApi[nodeId]

      const isMatching = queryLogic === 'or'
        ? filtersToUse.some((filter) => filterFunction(filter, nodeElement))
        : filtersToUse.every((filter) => filterFunction(filter, nodeElement))

      if (isMatching) {
        elementsToDisplay[nodeId] = {
          ...nodeElement,
          type: 'node',
        }
        continue
      }
    }
  }

  const edgesIds = getEdgeIds()

  if (edgesIds.length > 0) {
    for (let index = 0; index < edgesIds.length; index++) {
      const edgeId = edgesIds[index]

      const edgeElement = objectPropertiesFromApi[edgeId]

      const isMatching = queryLogic === 'or'
        ? filtersToUse.some((filter) => filterFunction(filter, edgeElement))
        : filtersToUse.every((filter) => filterFunction(filter, edgeElement))

      if (isMatching) {
        elementsToDisplay[edgeId] = {
          ...edgeElement,
          type: 'edge'
        }
        continue
      }
    }
  }

  return setStoreState('structuredSelection', JSON.parse(JSON.stringify(elementsToDisplay)))
}

export default structuredSearchElement
