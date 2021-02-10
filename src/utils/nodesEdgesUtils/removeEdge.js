import store from '../../store'

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
