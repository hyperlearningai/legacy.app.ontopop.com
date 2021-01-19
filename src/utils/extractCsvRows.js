/**
 * Extract csv rows
 * @param  {Object}   params
 * @param  {Array}    params.nodeKeys                   Array of node properties keys
 * @param  {Array}    params.edgeKeys                   Array of edge properties keys
 * @param  {Object}   params.availableNodesNormalised   Available nodes data
 * @param  {Object}   params.availableEdgesNormalised   Available edges data
 * @param  {Object}   params.objectPropertiesFromApi    Edges from initial OwlObjectProperties
 * @return
 */
const extractCsvRows = ({
  nodeKeys,
  edgeKeys,
  availableNodesNormalised,
  availableEdgesNormalised,
  objectPropertiesFromApi
}) => {
  const basicData = []
  const fullData = []

  const edgesIds = Object.keys(availableEdgesNormalised)

  for (let index = 0; index < edgesIds.length; index++) {
    const currentEdgeId = edgesIds[index]
    const {
      edgeId,
      label,
      from,
      fromLabel,
      to,
      toLabel
    } = availableEdgesNormalised[currentEdgeId]

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
      if (key === 'id' || key === 'label') return false

      fullRow[`from:${key}`] = availableNodesNormalised[from] ? availableNodesNormalised[from][key] : ''
      fullRow[`to:${key}`] = availableNodesNormalised[to] ? availableNodesNormalised[to][key] : ''
      return true
    })

    edgeKeys.map((key) => {
      if (key === 'id' || key === 'label') return false

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