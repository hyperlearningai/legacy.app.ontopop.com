import store from '../../store'

/**
 * Clear all nodes from graph
 * @return { undefined }
\ */
const clearNodes = () => {
  const {
    availableNodes
  } = store.getState()

  return availableNodes.clear()
}

export default clearNodes
