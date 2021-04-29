import { IGNORED_PROPERTIES } from '../../constants/export'
import store from '../../store'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import getNode from '../nodesEdgesUtils/getNode'
import getEdge from '../nodesEdgesUtils/getEdge'

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
    objectPropertiesFromApi,
  } = store.getState()

  const basicData = []
  const fullData = []

  const edgesIds = getEdgeIds()

  const edgesIdsLength = edgesIds.length - 1

  for (let index = edgesIdsLength; index >= 0; index--) {
    const currentEdgeId = edgesIds[edgesIdsLength - index]

    const {
      id,
      label,
      from,
      to,
    } = getEdge(currentEdgeId)

    const fromLabel = getNode(from).label
    const toLabel = getNode(to).label

    // basic csv data
    const basicCSv = {
      from: fromLabel ? fromLabel.replace(/\n/g, ' ') : '',
      edge: label,
      to: toLabel ? toLabel.replace(/\n/g, ' ') : ''
    }

    basicData.push(basicCSv)

    // full csv data
    const fullRow = {}

    const nodeKeysLength = nodeKeys.length - 1

    for (let nodeIndex = nodeKeysLength; nodeIndex >= 0; nodeIndex--) {
      const key = nodeKeys[nodeKeysLength - nodeIndex]

      if (IGNORED_PROPERTIES.includes(key)) continue

      const fromNode = getNode(from)
      const toNode = getNode(to)

      fullRow[`from:${key}`] = fromNode ? fromNode[key] : ''
      fullRow[`to:${key}`] = toNode ? toNode[key] : ''
    }

    const edgeKeysLength = edgeKeys.length - 1

    for (let edgeIndex = edgeKeysLength; edgeIndex >= 0; edgeIndex--) {
      const key = edgeKeys[edgeKeysLength - edgeIndex]

      if (IGNORED_PROPERTIES.includes(key)) continue

      fullRow[`edge:${key}`] = objectPropertiesFromApi[id][key]
    }

    fullData.push(fullRow)
  }

  return {
    basicData,
    fullData
  }
}

export default extractCsvRows
