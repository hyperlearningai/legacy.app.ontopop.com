import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Set node overlay
 * @param  {Object}   params
 * @param  {String} params.nodeId           Node ID
 * @return { undefined }
 */
const setNodesOverlay = ({
  nodeId
}) => {
  const {
    shortestPathNodes,
    isNodeOverlay,
    stylingNodeOverlayOpacity
  } = store.getState()

  if (!isNodeOverlay) return false

  const isOverlay = !shortestPathNodes.includes(nodeId)

  if (isOverlay) {
    updateNodes({
      id: nodeId,
      opacity: stylingNodeOverlayOpacity
    })
  }
}

export default setNodesOverlay
