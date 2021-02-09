import { IGNORED_PROPERTIES } from '../../constants/export'
import store from '../../store'

/**
 * Extract csv rows
 * @param  {Object}   params
 * @param  {Array}    params.nodeKeys                   Array of node properties keys
 * @param  {Array}    params.edgeKeys                   Array of edge properties keys
 * @return { undefined }
 */
const extractCsvRows = ({
  nodeKeys,
  edgeKeys,
}) => {
  const {
    availableNodes,
    availableEdges,
    objectPropertiesFromApi,
  } = store.getState()

  const basicData = []
  const fullData = []

  const edgesIds = availableEdges.getIds()

  for (let index = 0; index < edgesIds.length; index++) {
    const currentEdgeId = edgesIds[index]
    const {
      edgeId,
      label,
      from,
      fromLabel,
      to,
      toLabel
    } = availableEdges.get(currentEdgeId)

    // basic csv data
    const basicCSv = {
      from: fromLabel,
      predicate: label,
      to: toLabel
    }

    basicData.push(basicCSv)

    // full csv data
    const fullRow = {}

    nodeKeys.map((key) => {
      if (IGNORED_PROPERTIES.includes(key)) return false

      fullRow[`from:${key}`] = availableNodes.get(from) ? availableNodes.get(from)[key] : ''
      fullRow[`to:${key}`] = availableNodes.get(to) ? availableNodes.get(to)[key] : ''
      return true
    })

    edgeKeys.map((key) => {
      if (IGNORED_PROPERTIES.includes(key)) return false

      fullRow[`predicate:${key}`] = objectPropertiesFromApi[edgeId][key]
      return true
    })

    fullData.push(fullRow)
  }

  return {
    basicData,
    fullData
  }
}

export default extractCsvRows
