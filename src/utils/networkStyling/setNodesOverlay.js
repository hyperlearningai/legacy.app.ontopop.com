import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Set nodes overlay
 * @return { undefined }
 */
const setNodesOverlay = () => {
  const {
    shortestPathNodes,
    isNodeOverlay,
    globalNodeStyling,
    userDefinedNodeStyling
  } = store.getState()

  if (!isNodeOverlay) return false

  const nodesToStyle = getNode({
    filter: (node) => !shortestPathNodes.includes(node.id)
  })

  if (nodesToStyle.length > 0) {
    nodesToStyle.map((node) => {
      const { id, userDefined } = node

      const { stylingNodeOverlayOpacity } = userDefined ? userDefinedNodeStyling : globalNodeStyling

      updateNodes({
        id,
        opacity: stylingNodeOverlayOpacity
      })

      return true
    })
  }
}

export default setNodesOverlay
