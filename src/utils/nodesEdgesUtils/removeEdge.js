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

  const edgeIdObject = availableEdges.get(edgeId)

  if (edgeIdObject !== null) {
    availableEdges.remove(edgeId)
  }
}

export default removeEdge
