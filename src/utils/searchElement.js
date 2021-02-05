import { getEdgeUniqueId, getElementProperties } from '../constants/functions'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi          Nodes from initial OwlClasses
 * @param  {Array}    params.edgesIdsToDisplay       Array of edges IDs to display
 * @param  {Array}    params.nodesIdsToDisplay       Array of nodes IDs to display
 * @param  {Object}   params.objectPropertiesFromApi Edges from initial OwlObjectProperties
 * @param  {String}   params.search                  Search string
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const searchElement = ({
  classesFromApi,
  edgesIdsToDisplay,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  search,
  setStoreState
}) => {
  const elementsToDisplay = {}

  if (search === '') {
    return setStoreState('freeTextSelection', JSON.parse(JSON.stringify(elementsToDisplay)))
  }
  if (nodesIdsToDisplay.length > 0) {
    for (let index = 0; index < nodesIdsToDisplay.length; index++) {
      const nodeId = nodesIdsToDisplay[index]
      const nodeElement = classesFromApi[nodeId]
      const elementKeys = getElementProperties(nodeElement)
      if (elementKeys.length === 0) continue
      const isContainingSearch = elementKeys.some((key) => nodeElement[key] && nodeElement[key].toString().toLowerCase().includes(search.toLowerCase()))
      if (isContainingSearch) {
        elementsToDisplay[nodeId] = 'node'
      }
    }
  }

  if (edgesIdsToDisplay.length > 0) {
    for (let index = 0; index < edgesIdsToDisplay.length; index++) {
      const edgeId = edgesIdsToDisplay[index]

      const edgeUniqueId = getEdgeUniqueId(edgeId)
      const edgeElement = objectPropertiesFromApi[edgeUniqueId]

      const elementKeys = getElementProperties(edgeElement)

      if (elementKeys.length === 0) continue

      const isContainingSearch = elementKeys.some((key) => edgeElement[key] && edgeElement[key].toString().toLowerCase().includes(search.toLowerCase()))

      if (isContainingSearch) {
        elementsToDisplay[edgeId] = 'edge'
      }
    }
  }

  return setStoreState('freeTextSelection', JSON.parse(JSON.stringify(elementsToDisplay)))
}

export default searchElement
