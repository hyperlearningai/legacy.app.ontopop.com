import { SPIDERABLE_NODE_BORDER_COLOR, SPIDERABLE_NODE_BORDER_WIDTH } from '../constants/graph'
import getNode from './nodesEdgesUtils/getNode'
import getNodeIds from './nodesEdgesUtils/getNodeIds'
import updateNodes from './nodesEdgesUtils/updateNodes'

/**
 * Get shortest path
 * @param  {Object}   params
 * @param  {Object}   params.nodesConnections           Normalised array of nodes with related in and out connections
 * @param  {Object}   params.triplesPerNode             List of triples per node
 * @return { undefined }
 */
const highlightSpiderableNodes = ({
  nodesConnections,
  triplesPerNode,
}) => {
  const availableNodesIDs = getNodeIds()

  if (availableNodesIDs.length > 0) {
    availableNodesIDs.map((nodeId) => {
      const currentNodeConnections = nodesConnections[nodeId]?.length
      const totalNodesConnections = triplesPerNode[nodeId]?.length

      if (currentNodeConnections < totalNodesConnections) {
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
