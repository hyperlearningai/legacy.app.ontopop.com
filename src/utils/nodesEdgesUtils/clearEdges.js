import store from '../../store'

/**
 * Clear all edges from graph
 * @return { undefined }
\ */
const clearEdges = () => {
  const {
    availableEdges
  } = store.getState()

  return availableEdges.clear()
}

export default clearEdges
