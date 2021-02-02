import { getEdgeAndNodes } from '../constants/functions'
import store from '../store'

/**
* Get shortest path
 * @param  {Object}   params
 * @param  {Array}    params.edgesFilters              Array of node filters {property [string], value [string]}
 * @return {Array}    nodesToDisplay                   Array of node IDs strings
 */
const getNodesEdgesFromEdgesFilters = ({
  edgesFilters
}) => {
  const {
    availableEdgesNormalised,
    objectPropertiesFromApi
  } = store.getState()

  const edgesToDisplay = []
  const nodesToDisplay = []

  const edgesAnalysed = []
  const edgesAnalysedAndAdded = []

  const availableEdgesIds = Object.keys(availableEdgesNormalised)

  if (availableEdgesIds?.length > 0) {
    for (let index = 0; index < availableEdgesIds.length; index++) {
      const edgeId = availableEdgesIds[index]
      const [predicate, from, to] = getEdgeAndNodes(edgeId)

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

      const predicateObject = objectPropertiesFromApi[predicate]

      for (let propertyIndex = 0; propertyIndex < edgesFilters.length; propertyIndex++) {
        const { property, value } = edgesFilters[propertyIndex]
        if (property === '') continue
        if (value === '') continue

        const isEdgeToBeAdded = predicateObject[property]
          && predicateObject[property].toLowerCase().includes(value.toLowerCase())

        if (isEdgeToBeAdded) {
          edgesAnalysed.push(predicate)
          edgesAnalysedAndAdded.push(predicate)

          if (!nodesToDisplay.includes(from)) {
            nodesToDisplay.push(from)
          }

          if (!nodesToDisplay.includes(from)) {
            nodesToDisplay.push(from)
          }

          if (!edgesToDisplay.includes(predicate)) {
            edgesToDisplay.push(predicate)
          }

          break
        }

        if (propertyIndex === edgesFilters.length - 1) {
          edgesAnalysed.push(predicate)
        }
      }
    }
  }

  return {
    edgesToDisplay,
    nodesToDisplay
  }
}

export default getNodesEdgesFromEdgesFilters
