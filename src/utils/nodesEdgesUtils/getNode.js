import store from '../../store'

const getNode = (nodeId) => {
  const {
    availableNodes
  } = store.getState()

  return availableNodes.get(nodeId)
}

export default getNode
