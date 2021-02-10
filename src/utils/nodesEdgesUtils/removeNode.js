import store from '../../store'

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
