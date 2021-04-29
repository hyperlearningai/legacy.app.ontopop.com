import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Get triples from API
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue              updateStoreValue action
 * @param  {Array}    params.edges                      Edges from API
 * @return {undefined}
 */
const getTriplesFromApi = ({
  updateStoreValue,
  edges
}) => {
  const totalEdgesPerNode = {}

  const edgesIds = Object.keys(edges)
  const edgesIdsLength = edgesIds.length - 1

  for (let index = edgesIdsLength; index >= 0; index--) {
    const edgeId = edgesIds[edgesIdsLength - index]

    const edge = edges[edgeId]

    const {
      from,
      to,
    } = edge

    const id = edge.id.toString()
    const fromAsString = from.toString()
    const toAsString = to.toString()

    if (!totalEdgesPerNode[fromAsString]) {
      totalEdgesPerNode[fromAsString] = [id]
    } else if (!totalEdgesPerNode[fromAsString].includes(id)) {
      totalEdgesPerNode[fromAsString].push(id)
    }

    if (!totalEdgesPerNode[toAsString]) {
      totalEdgesPerNode[toAsString] = [id]
    } else if (!totalEdgesPerNode[toAsString].includes(id)) {
      totalEdgesPerNode[toAsString].push(id)
    }
  }

  updateStoreValue(['totalEdgesPerNode'], OPERATION_TYPE_UPDATE, totalEdgesPerNode)
  updateStoreValue(['totalEdgesPerNodeBackup'], OPERATION_TYPE_UPDATE, totalEdgesPerNode)
}

export default getTriplesFromApi
