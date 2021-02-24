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
  const triplesPerNode = {}

  edges.map((edge) => {
    const { sourceNodeId, targetNodeId, edgeId } = edge

    const id = edgeId.toString()

    if (!triplesPerNode[sourceNodeId.toString()]) {
      triplesPerNode[sourceNodeId.toString()] = [id]
    } else if (!triplesPerNode[sourceNodeId.toString()].includes(id)) {
      triplesPerNode[sourceNodeId.toString()].push(id)
    }

    if (!triplesPerNode[targetNodeId.toString()]) {
      triplesPerNode[targetNodeId.toString()] = [id]
    } else if (!triplesPerNode[targetNodeId.toString()].includes(id)) {
      triplesPerNode[targetNodeId.toString()].push(id)
    }

    return true
  })

  setStoreState('triplesPerNode', triplesPerNode)
  setStoreState('triplesPerNodeBackup', triplesPerNode)
}

export default getTriplesFromApi
