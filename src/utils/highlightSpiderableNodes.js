import { SPIDERABLE_NODE_BORDER_COLOR, SPIDERABLE_NODE_BORDER_WIDTH } from '../constants/graph'

/**
 * Get shortest path
 * @param  {Object}   params
 * @param  {Object}   params.nodesConnections           Normalised array of nodes with related in and out connections
 * @param  {Object}   params.triplesPerNode             List of triples per node
 * @param  {Object}   params.availableNodes             VisJs Dataset of nodes IDs
 * @return { undefined }
 */
const highlightSpiderableNodes = ({
  nodesConnections,
  triplesPerNode,
  availableNodes,
}) => {
  const availableNodesIDs = availableNodes.getIds()

  if (availableNodesIDs.length > 0) {
    availableNodesIDs.map((nodeId) => {
      const currentNodeConnections = nodesConnections[nodeId]?.length
      const totalNodesConnections = triplesPerNode[nodeId]?.length

      if (currentNodeConnections < totalNodesConnections) {
        const currentNodeProperties = availableNodes.get(nodeId)

        let existingColorProperties

        if (currentNodeProperties.color) {
          existingColorProperties = currentNodeProperties.color
        }

        availableNodes.update({
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
