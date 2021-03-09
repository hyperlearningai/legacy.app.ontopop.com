/* eslint no-console:0 */
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

  try {
    availableNodes.add(node)
    addNumber('availableNodesCount', 1)
  } catch (error) {
    return error
  }
}

export default addNode
