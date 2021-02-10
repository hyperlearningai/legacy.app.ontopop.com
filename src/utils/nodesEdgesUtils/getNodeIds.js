import store from '../../store'

const getNodeIds = () => {
  const {
    availableNodes
  } = store.getState()

  return availableNodes.getIds()
}

export default getNodeIds
