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

  const isNodeNotVisible = availableNodes.get(nodeObject.id) === null

  if (isNodeNotVisible) {
    availableNodes.add(nodeObject)
  }
}

export default addNode
