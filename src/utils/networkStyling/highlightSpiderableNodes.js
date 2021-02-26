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
    edgesPerNode,
  } = store.getState()

  const availableNodesIDs = getNodeIds()

  if (availableNodesIDs.length > 0) {
    availableNodesIDs.map((nodeId) => {
      const currentNodeConnections = nodesEdges[nodeId]?.length
      const totalNodesEdges = edgesPerNode[nodeId]?.length

      if (currentNodeConnections < totalNodesEdges) {
        const currentNodeProperties = getNode(nodeId)

        let existingColorProperties

        if (currentNodeProperties.color) {
          existingColorProperties = currentNodeProperties.color
        }

        updateNodes({
          id: nodeId,
          color: {
            ...existingColorProperties,
            border: SPIDERABLE_NODE_BORDER_COLOR
          },
          borderWidth: SPIDERABLE_NODE_BORDER_WIDTH
        })
      }

      return true
    })
  }
}

export default highlightSpiderableNodes
