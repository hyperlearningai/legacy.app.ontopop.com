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

  Object.keys(edges).map((edgeId) => {
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

    return true
  })

  updateStoreValue(['totalEdgesPerNode'], OPERATION_TYPE_UPDATE, totalEdgesPerNode)
  updateStoreValue(['totalEdgesPerNodeBackup'], OPERATION_TYPE_UPDATE, totalEdgesPerNode)
}

export default getTriplesFromApi
