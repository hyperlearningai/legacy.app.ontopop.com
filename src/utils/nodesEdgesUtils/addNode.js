/* eslint no-console:0 */
import { OPERATION_TYPE_ADD } from '../../constants/store'
import store from '../../store'
import getNode from './getNode'

/**
 * Add node to graph
 * @param  {Object}     params
 * @param  {Object}     params.node                  Node object with at least id and label keys
 * @param  {Function}   params.updateStoreValue      updateStoreValue action
 * @return { undefined }
\ */
const addNode = ({
  node,
  updateStoreValue,
}) => {
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

  updateStoreValue(['availableNodesCount'], OPERATION_TYPE_ADD, 1)
}

export default addNode
