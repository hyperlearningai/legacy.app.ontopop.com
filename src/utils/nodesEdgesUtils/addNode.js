import store from '../../store'

/**
 * Add node to graph
 * @param  {Object}   nodeObject    Node object with at least id and label keys
 * @return { undefined }
\ */
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
