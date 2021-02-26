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

  for (let index = 0; index < edgesIds.length; index++) {
    const currentEdgeId = edgesIds[index]
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

    nodeKeys.map((key) => {
      if (IGNORED_PROPERTIES.includes(key)) return false

      const fromNode = getNode(from)
      const toNode = getNode(to)

      fullRow[`from:${key}`] = fromNode ? fromNode[key] : ''
      fullRow[`to:${key}`] = toNode ? toNode[key] : ''
      return true
    })

    edgeKeys.map((key) => {
      if (IGNORED_PROPERTIES.includes(key)) return false

      fullRow[`edge:${key}`] = objectPropertiesFromApi[id][key]
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
