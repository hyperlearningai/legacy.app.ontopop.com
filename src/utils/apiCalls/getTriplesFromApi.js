/**
 * Get triples from API
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Array}    params.edges                      Edges from API
 * @return {undefined}
 */
const getTriplesFromApi = ({
  setStoreState,
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

    if (!totalEdgesPerNode[from.toString()]) {
      totalEdgesPerNode[from.toString()] = [id]
    } else if (!totalEdgesPerNode[from.toString()].includes(id)) {
      totalEdgesPerNode[from.toString()].push(id)
    }

    if (!totalEdgesPerNode[to.toString()]) {
      totalEdgesPerNode[to.toString()] = [id]
    } else if (!totalEdgesPerNode[to.toString()].includes(id)) {
      totalEdgesPerNode[to.toString()].push(id)
    }

    return true
  })

  setStoreState('totalEdgesPerNode', totalEdgesPerNode)
  setStoreState('totalEdgesPerNodeBackup', totalEdgesPerNode)
}

export default getTriplesFromApi
