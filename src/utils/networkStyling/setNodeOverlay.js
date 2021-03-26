import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Set node overlay
 * @param  {Object}   params
 * @param  {String} params.nodeId           Node ID
 * @return { undefined }
 */
const setNodeOverlay = ({
  nodeId
}) => {
  const {
    shortestPathNodes,
    isNodeOverlay,
    globalNodeStyling,
  } = store.getState()

  if (!isNodeOverlay) return false

  const isOverlay = !shortestPathNodes.includes(nodeId)

  if (isOverlay) {
    updateNodes({
      id: nodeId,
      opacity: globalNodeStyling.stylingNodeOverlayOpacity
    })
  }
}

export default setNodeOverlay
