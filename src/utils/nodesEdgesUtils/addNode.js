import store from '../../store'

const addNode = (nodeObject) => {
  const {
    availableNodes
  } = store.getState()

  const nodeIdObject = availableNodes.get(nodeObject.id)

  if (nodeIdObject === null) {
    availableNodes.add(nodeObject)
  }
}

export default addNode
