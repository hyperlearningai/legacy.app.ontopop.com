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

    if (!triplesPerNode[sourceNodeId.toString()]) {
      triplesPerNode[sourceNodeId.toString()] = [edgeId]
    } else if (!triplesPerNode[sourceNodeId.toString()].includes(edgeId)) {
      triplesPerNode[sourceNodeId.toString()].push(edgeId)
    }

    if (!triplesPerNode[targetNodeId.toString()]) {
      triplesPerNode[targetNodeId.toString()] = [edgeId]
    } else if (!triplesPerNode[targetNodeId.toString()].includes(edgeId)) {
      triplesPerNode[targetNodeId.toString()].push(edgeId)
    }

    return true
  })

  setStoreState('triplesPerNode', triplesPerNode)
}

export default getTriplesFromApi
