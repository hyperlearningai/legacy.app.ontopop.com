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

  setStoreState('totalEdgesPerNode', totalEdgesPerNode)
  setStoreState('totalEdgesPerNodeBackup', totalEdgesPerNode)
}

export default getTriplesFromApi
