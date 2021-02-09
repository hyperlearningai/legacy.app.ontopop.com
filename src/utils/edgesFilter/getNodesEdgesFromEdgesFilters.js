import { getEdgeAndNodes } from '../../constants/functions'
import store from '../../store'

/**
* Get nodes and edges to display from edges filter
 * @param  {Object}   params
 * @param  {Array}    params.edgesFilters              Array of node filters {property [string], value [string]}
 * @return {Object}   output
 * @return {Array}    output.nodesToDisplay            Array of node IDs strings
 * @return {Array}    output.edgesToDisplay            Array of edge IDs strings
 */
const getNodesEdgesFromEdgesFilters = ({
  edgesFilters
}) => {
  const {
    availableEdges,
    objectPropertiesFromApi
  } = store.getState()

  const objectPropertiesFromApiKeys = Object.keys(objectPropertiesFromApi)

  const edgesMatchingFilters = []

  for (let index = 0; index < objectPropertiesFromApiKeys.length; index++) {
    const objectPropertyId = objectPropertiesFromApiKeys[index]
    const objectProperty = objectPropertiesFromApi[objectPropertyId]

    for (let index2 = 0; index2 < edgesFilters.length; index2++) {
      const {
        property,
        value
      } = edgesFilters[index2]

      if (property === '') continue
      if (value === '') continue
      if (!objectProperty[property]) continue

      const objectPropertyKeyValue = objectProperty[property]
      const isObjectPropertyKeyValueMatching = objectPropertyKeyValue
      && objectPropertyKeyValue.toLowerCase().includes(value.toLowerCase())

      const isObjectPropertyOwlPropertyKeyValueMatching = objectProperty.owlAnnotationProperties
      && objectProperty.owlAnnotationProperties[property]
      && objectProperty.owlAnnotationProperties?.[property].toLowerCase().includes(value.toLowerCase())

      const isEdgeToBeAdded = isObjectPropertyKeyValueMatching || isObjectPropertyOwlPropertyKeyValueMatching

      if (isEdgeToBeAdded) {
        edgesMatchingFilters.push(objectPropertyId)
        break
      }
    }
  }

  const edgesToDisplay = []
  const nodesToDisplay = []

  const edgesAnalysed = []
  const edgesAnalysedAndAdded = []

  const availableEdgesIds = availableEdges.getIds()

  if (availableEdgesIds?.length > 0) {
    for (let index = 0; index < availableEdgesIds.length; index++) {
      const edgeId = availableEdgesIds[index]

      const [predicate, from, to] = getEdgeAndNodes(edgeId)

      if (!edgesMatchingFilters.includes(predicate)) continue

      if (edgesAnalysedAndAdded.includes(predicate)) {
        if (!nodesToDisplay.includes(from)) {
          nodesToDisplay.push(from)
        }

        if (!nodesToDisplay.includes(to)) {
          nodesToDisplay.push(to)
        }

        continue
      }

      if (edgesAnalysed.includes(predicate)) {
        continue
      }

      edgesAnalysed.push(predicate)
      edgesAnalysedAndAdded.push(predicate)

      if (!nodesToDisplay.includes(from)) {
        nodesToDisplay.push(from)
      }

      if (!nodesToDisplay.includes(to)) {
        nodesToDisplay.push(to)
      }

      if (!edgesToDisplay.includes(predicate)) {
        edgesToDisplay.push(predicate)
      }
    }
  }

  return {
    edgesToDisplay,
    nodesToDisplay
  }
}

export default getNodesEdgesFromEdgesFilters
