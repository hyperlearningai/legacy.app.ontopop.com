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

  if (nodesToStyle.length === 0) return false

  const nodesToStyleLength = nodesToStyle.length - 1

  for (let index = nodesToStyleLength; index >= 0; index--) {
    const node = nodesToStyle[nodesToStyleLength - index]

    const { id, userDefined } = node

    const { stylingNodeOverlayOpacity } = userDefined ? userDefinedNodeStyling : globalNodeStyling

    updateNodes({
      id,
      opacity: stylingNodeOverlayOpacity
    })
  }
}

export default setNodesOverlay
