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
  const edgesPerNode = {}

  Object.keys(edges).map((edgeId) => {
    const edge = edges[edgeId]

    const {
      from,
      to,
    } = edge

    const id = edge.id.toString()

    if (!edgesPerNode[from.toString()]) {
      edgesPerNode[from.toString()] = [id]
    } else if (!edgesPerNode[from.toString()].includes(id)) {
      edgesPerNode[from.toString()].push(id)
    }

    if (!edgesPerNode[to.toString()]) {
      edgesPerNode[to.toString()] = [id]
    } else if (!edgesPerNode[to.toString()].includes(id)) {
      edgesPerNode[to.toString()].push(id)
    }

    return true
  })

  setStoreState('edgesPerNode', edgesPerNode)
  setStoreState('edgesPerNodeBackup', edgesPerNode)
}

export default getTriplesFromApi
