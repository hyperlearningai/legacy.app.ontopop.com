import store from '../../store'

/**
 * Add node to graph
 * @param  {Object}     params
 * @param  {Object}     params.node           Node object with at least id and label keys
 * @param  {function}   params.addNumber      Add number action
 * @return { undefined }
\ */
const addNode = ({ node, addNumber }) => {
  const {
    availableNodes
  } = store.getState()

  const isNodeNotVisible = availableNodes.get(node.id) === null

  if (isNodeNotVisible) {
    availableNodes.add(node)
    addNumber('availableNodesCount', 1)
  }
}

export default addNode
