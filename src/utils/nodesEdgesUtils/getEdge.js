import store from '../../store'

const getEdge = (edgeId) => {
  const {
    availableEdges
  } = store.getState()

  return availableEdges.get(edgeId)
}

export default getEdge
