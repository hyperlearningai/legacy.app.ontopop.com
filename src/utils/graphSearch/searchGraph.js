import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'

/**
 * Search graph
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue        updateStoreValue action
 * @param  {Function} params.setLoading              Set loading function
 * @return { undefined }
 */
const searchGraph = ({
  updateStoreValue,
  setLoading,
}) => {
  const {
    classesFromApi,
    objectPropertiesFromApi,
    entrySearchFilter,
    entrySearchAnnotationProperties,
    entrySearchValue
  } = store.getState()

  const entrySearchResults = []

  if (!entrySearchValue || typeof entrySearchValue !== 'string' || entrySearchValue === '') {
    return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, entrySearchResults)
  }

  if (entrySearchAnnotationProperties.length === 0) {
    return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, entrySearchResults)
  }

  setLoading(true)

  if (entrySearchFilter !== 'edges') {
    const nodeIds = Object.keys(classesFromApi)

    if (nodeIds.length > 0) {
      for (let index = 0; index < nodeIds.length; index++) {
        const nodeId = nodeIds[index]
        const nodeElement = classesFromApi[nodeId]

        const isAnnotationPropertyContainingSearch = entrySearchAnnotationProperties.some(
          (property) => nodeElement[property]
          && nodeElement[property].toString().toLowerCase().includes(entrySearchValue.toLowerCase())
        )

        nodeElement.type = 'node'

        if (isAnnotationPropertyContainingSearch) {
          entrySearchResults.push(nodeElement)
        }
      }
    }
  }

  if (entrySearchFilter !== 'nodes') {
    const edgesIds = Object.keys(objectPropertiesFromApi)

    if (edgesIds.length > 0) {
      for (let index = 0; index < edgesIds.length; index++) {
        const edgeId = edgesIds[index]

        const edgeElement = objectPropertiesFromApi[edgeId]

        const isContainingSearch = entrySearchAnnotationProperties.some((property) => edgeElement[property]
          && edgeElement[property].toString().toLowerCase().includes(entrySearchValue.toLowerCase()))

        edgeElement.type = 'edge'

        if (isContainingSearch) {
          entrySearchResults.push(edgeElement)
        }
      }
    }
  }

  setLoading(false)

  updateStoreValue(['isQueried'], OPERATION_TYPE_UPDATE, true)
  return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, entrySearchResults)
}

export default searchGraph
