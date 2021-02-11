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

  const nodeIdObject = availableNodes.get(nodeId)

  if (nodeIdObject !== null) {
    availableNodes.remove(nodeId)
  }
}

export default removeNode
