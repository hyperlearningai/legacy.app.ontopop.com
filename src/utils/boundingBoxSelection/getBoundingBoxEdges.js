import store from '../../store'

/**
 * Get edges connecting bounding box nodes
 * @param  {Object}   params
 * @param  {String}   params.selectedBoundingBoxNodes   Array of selected bounding box nodes
 * @return {Array}    boundingBoxEdges                  Array of edges related to bounding box nodes
 */
const getBoundingBoxEdges = ({
  selectedBoundingBoxNodesIds,
}) => {
  const {
    triplesPerNode
  } = store.getState()

  const boundingBoxEdges = []

  if (!selectedBoundingBoxNodesIds || selectedBoundingBoxNodesIds.length === 0) return boundingBoxEdges

  selectedBoundingBoxNodesIds.map((nodeId) => {
    const listOfTriples = triplesPerNode[nodeId]

    if (listOfTriples && listOfTriples.length > 0) {
      listOfTriples.map((triple) => {
        const {
          from,
          predicate,
          to
        } = triple

        const newNode = from === nodeId ? to : from

        if (selectedBoundingBoxNodesIds.includes(newNode)
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
