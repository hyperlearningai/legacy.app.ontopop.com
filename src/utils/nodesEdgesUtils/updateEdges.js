import store from '../../store'

const updateEdges = (edgesObjects) => {
  const {
    availableEdges
  } = store.getState()

  availableEdges.update(edgesObjects)
}

export default updateEdges
