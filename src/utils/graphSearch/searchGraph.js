import store from '../../store'

/**
 * Search graph
 * @param  {Object}   params
 * @param  {String}   params.search                  Search string
 * @param  {Function} params.setStoreState           setStoreState action
 * @param  {Function} params.setLoading              Set loading function
 * @return { undefined }
 */
const searchGraph = ({
  value,
  setStoreState,
  setLoading
}) => {
  const {
    classesFromApi,
    objectPropertiesFromApi,
    entrySearchFilter,
    entrySearchAnnotationProperties,
  } = store.getState()

  const entrySearchResults = []

  if (value === '') {
    return setStoreState('entrySearchResults', entrySearchResults)
  }

  if (entrySearchAnnotationProperties.length === 0) {
    return setStoreState('entrySearchResults', entrySearchResults)
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
          && nodeElement[property].toString().toLowerCase().includes(value.toLowerCase())
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
          && edgeElement[property].toString().toLowerCase().includes(value.toLowerCase()))

        edgeElement.type = 'edge'

        if (isContainingSearch) {
          entrySearchResults.push(edgeElement)
        }
      }
    }
  }

  setLoading(false)

  setStoreState('isQueried', true)
  return setStoreState('entrySearchResults', entrySearchResults)
}

export default searchGraph
