import store from '../../store'

/**
 * Remove node from graph
 * @param  {String}   nodeId    Node id
 * @return { undefined }
\ */
const removeNode = (nodeId) => {
  const {
    availableNodes
  } = store.getState()

  const isNodeVisible = availableNodes.get(nodeId) !== null

  if (isNodeVisible) {
    availableNodes.remove(nodeId)
  }
}

export default removeNode
