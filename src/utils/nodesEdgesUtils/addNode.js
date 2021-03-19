/* eslint no-console:0 */
import store from '../../store'
import getNode from './getNode'

/**
 * Add node to graph
 * @param  {Object}     params
 * @param  {Object}     params.node           Node object with at least id and label keys
 * @param  {Function}   params.addNumber      Add number action
 * @return { undefined }
\ */
const addNode = ({ node, addNumber }) => {
  const {
    availableNodes
  } = store.getState()

  const isVisible = getNode(node.id)

  if (isVisible !== null) return false

  availableNodes.add({
    ...node,
    x: Math.floor((Math.random() * 1500) + 1),
    y: Math.floor((Math.random() * 1500) + 1)
  })

  addNumber('availableNodesCount', 1)
}

export default addNode
