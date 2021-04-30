import { SPIDERABLE_NODE_BORDER_COLOR, SPIDERABLE_NODE_BORDER_WIDTH } from '../../constants/graph'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight spiderable nodes borders
 * @return { undefined }
 */
const highlightSpiderableNodes = () => {
  const {
    nodesEdges,
    totalEdgesPerNode,
    globalNodeStyling,
    userDefinedNodeStyling
  } = store.getState()

  const availableNodesIDs = getNodeIds()

  if (availableNodesIDs.length === 0) return false
  const availableNodesIDsLength = availableNodesIDs.length - 1

  for (let index = availableNodesIDsLength; index >= 0; index--) {
    const nodeId = availableNodesIDs[availableNodesIDsLength - index]

    const currentNodeConnections = nodesEdges[nodeId]?.length
    const totalNodesEdges = totalEdgesPerNode[nodeId]?.length

    const node = getNode(nodeId)

    const { userDefined } = node

    const {
      stylingNodeBorderColor,
      stylingNodeBorder
    } = userDefined ? userDefinedNodeStyling : globalNodeStyling

    const isSpiderable = currentNodeConnections < totalNodesEdges

    updateNodes({
      id: nodeId,
      color: {
        border: isSpiderable
          ? SPIDERABLE_NODE_BORDER_COLOR : stylingNodeBorderColor
      },
      borderWidth: isSpiderable
        ? SPIDERABLE_NODE_BORDER_WIDTH
        : stylingNodeBorder
    })
  }
}

export default highlightSpiderableNodes
