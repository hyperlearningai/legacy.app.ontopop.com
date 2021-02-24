import { RESERVED_PROPERTIES } from '../../constants/graph'
import store from '../../store'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {String}   params.search                  Search string
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const searchElement = ({
  search,
  setStoreState
}) => {
  const {
    classesFromApi,
    objectPropertiesFromApi,
  } = store.getState()

  const elementsToDisplay = {}

  if (search === '') {
    return setStoreState('freeTextSelection', JSON.parse(JSON.stringify(elementsToDisplay)))
  }

  const nodeIds = getNodeIds()

  if (nodeIds.length > 0) {
    for (let index = 0; index < nodeIds.length; index++) {
      const nodeId = nodeIds[index]
      const nodeElement = classesFromApi[nodeId]

      const annotationProperties = Object.keys(nodeElement).filter((property) => !RESERVED_PROPERTIES.includes(property))

      if (annotationProperties.length === 0) continue

      const isAnnotationPropertyContainingSearch = annotationProperties.some((property) => nodeElement[property]
      && nodeElement[property].toString().toLowerCase().includes(search.toLowerCase()))

      if (isAnnotationPropertyContainingSearch) {
        elementsToDisplay[nodeId] = 'node'
        continue
      }
    }
  }

  const edgesIds = getEdgeIds()

  if (edgesIds.length > 0) {
    for (let index = 0; index < edgesIds.length; index++) {
      const edgeId = edgesIds[index]

      const edgeElement = objectPropertiesFromApi[edgeId]

      const annotationProperties = Object.keys(edgeElement).filter((property) => typeof edgeElement[property] !== 'object'
      && !RESERVED_PROPERTIES.includes(property))

      if (annotationProperties.length === 0) continue

      const isContainingSearch = annotationProperties.some((property) => edgeElement[property]
      && edgeElement[property].toString().toLowerCase().includes(search.toLowerCase()))

      if (isContainingSearch) {
        elementsToDisplay[edgeId] = 'edge'
      }
    }
  }

  return setStoreState('freeTextSelection', JSON.parse(JSON.stringify(elementsToDisplay)))
}

export default searchElement
