import store from '../../store'
import getNode from './getNode'

/**
 * Remove node from graph
 * @param  {String}     nodeId                Node id
 * @param  {Function}   params.addNumber      Add number action
 * @return { undefined }
\ */
const removeNode = ({ nodeId, addNumber }) => {
  const {
    availableNodes
  } = store.getState()

  const isVisible = getNode(nodeId)

  if (isVisible === null) return false

  availableNodes.remove(nodeId)
  addNumber('availableNodesCount', -1)
}

export default removeNode
