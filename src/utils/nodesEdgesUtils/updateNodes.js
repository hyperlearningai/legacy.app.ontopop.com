import store from '../../store'

const updateNodes = (nodesObjects) => {
  const {
    availableNodes
  } = store.getState()

  availableNodes.update(nodesObjects)
}

export default updateNodes
