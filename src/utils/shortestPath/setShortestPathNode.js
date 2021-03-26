import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodeBackground from './updateNodeBackground'

/**
 * Set shortest path
 * @param  {Object}   params
 * @param  {Boolean}  params.state              Shortest path node state to update
 * @param  {Function} params.updateStoreValue   updateStoreValue action
 * @param  {Function} params.nodeId             Selected node id
 * @return { undefined }
 */
const setShortestPathNode = ({
  state,
  updateStoreValue,
  nodeId,
}) => {
  const {
    shortestPathNode1,
    shortestPathNode1Object,
    shortestPathNode2,
    shortestPathNode2Object,
    stylingNodeBackgroundColor,
    stylingNodeHighlightBackgroundColor
  } = store.getState()

  // exit if selecting same node at start and end
  if (state === 'shortestPathNode1' && shortestPathNode2 === nodeId) return false
  if (state === 'shortestPathNode2' && shortestPathNode1 === nodeId) return false

  if (state === 'shortestPathNode1' && shortestPathNode1Object) {
    updateNodeBackground({
      background: stylingNodeBackgroundColor,
      nodeId: shortestPathNode1,
      originalNode: shortestPathNode1Object,
      restore: true
    })
  }

  if (state === 'shortestPathNode2' && shortestPathNode2Object) {
    updateNodeBackground({
      background: stylingNodeBackgroundColor,
      nodeId: shortestPathNode2,
      originalNode: shortestPathNode2Object,
      restore: true
    })
  }

  const originalNode = getNode(nodeId)
  updateStoreValue([`${state}Object`], OPERATION_TYPE_UPDATE, JSON.parse(JSON.stringify(originalNode)))

  updateNodeBackground({
    background: stylingNodeHighlightBackgroundColor,
    nodeId,
    originalNode,
  })

  updateStoreValue([state], OPERATION_TYPE_UPDATE, nodeId)
}

export default setShortestPathNode
