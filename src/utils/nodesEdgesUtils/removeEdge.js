import store from '../../store'

/**
 * Remove edge from graph
 * @param  {String}   edgeId    Edge id
 * @return { undefined }
\ */
const removeEdge = (edgeId) => {
  const {
    availableEdges
  } = store.getState()

  const isEdgeVisible = availableEdges.get(edgeId) !== null

  if (isEdgeVisible) {
    availableEdges.remove(edgeId)
  }
}

export default removeEdge
