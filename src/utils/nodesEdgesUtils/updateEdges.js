import store from '../../store'

/**
 * Update nodes in graph
 * @param  {Object|Array}   edgesObjects   Array of objects or object with edge id and key properties to update
 * @return { undefined }
\ */
const updateEdges = (edgesObjects) => {
  const {
    availableEdges
  } = store.getState()

  availableEdges.update(edgesObjects)
}

export default updateEdges
