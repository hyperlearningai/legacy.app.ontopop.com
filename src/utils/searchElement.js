import { getEdgeUniqueId, getElementProperties } from '../constants/functions'
import { LOW_LEVEL_PROPERTIES } from '../constants/graph'

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

      // check content in low level properties
      const isLowLevelPropertyContainingSearch = LOW_LEVEL_PROPERTIES.some((property) => nodeElement[property]
        && nodeElement[property].toString().toLowerCase().includes(search.toLowerCase()))

      if (isLowLevelPropertyContainingSearch) {
        elementsToDisplay[nodeId] = 'node'
        continue
      }

      // check in annotation properties
      const annotationProperties = Object.keys(nodeElement.owlAnnotationProperties)

      if (annotationProperties.length === 0) continue

      const isAnnotationPropertyContainingSearch = annotationProperties.some((property) => nodeElement.owlAnnotationProperties[property]
      && nodeElement.owlAnnotationProperties[property].toString().toLowerCase().includes(search.toLowerCase()))

      if (isAnnotationPropertyContainingSearch) {
        elementsToDisplay[nodeId] = 'node'
        continue
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
