/**
 * Get edges connecting bounding box nodes
 * @param  {Object}   params
 * @param  {Object}   params.triplesPerNode             List of triples per node
 * @param  {String}   params.selectedBoundingBoxNodes   Array of selected bounding box nodes
 * @return {Array}    boundingBoxEdges                  Array of edges related to bounding box nodes
 */
const getBoundingBoxEdges = ({
  selectedBoundingBoxNodes,
  triplesPerNode
}) => {
  const boundingBoxEdges = []

  if (!selectedBoundingBoxNodes || selectedBoundingBoxNodes.length < 1) return boundingBoxEdges

  selectedBoundingBoxNodes.map((nodeId) => {
    const listOfTriples = triplesPerNode[nodeId]

    if (listOfTriples && listOfTriples.length > 0) {
      listOfTriples.map((triple) => {
        const {
          from,
          predicate,
          to
        } = triple

        const newNode = from === nodeId ? to : from

        if (selectedBoundingBoxNodes.includes(newNode)
        && !boundingBoxEdges.includes(predicate)) {
          boundingBoxEdges.push(predicate)
        }

        return true
      })
    }

    return true
  })

  return boundingBoxEdges
}

export default getBoundingBoxEdges
