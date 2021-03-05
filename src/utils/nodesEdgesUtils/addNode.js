import store from '../../store'
import setNodeStyle from '../networkStyling/setNodeStyle'

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
    setNodeStyle({ nodeId: nodeObject.id })
  }
}

export default addNode
