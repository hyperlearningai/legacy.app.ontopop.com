import store from '../../store'

/**
 * Update nodes in graph
 * @param  {Object|Array}   nodesObjects   Array of objects or object with node id and key properties to update
 * @return { undefined }
\ */
const updateNodes = (nodesObjects) => {
  const {
    availableNodes
  } = store.getState()

  availableNodes.update(nodesObjects)
}

export default updateNodes
