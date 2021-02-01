import { SPIDERABLE_NODE_BORDER_COLOR, SPIDERABLE_NODE_BORDER_WIDTH } from '../constants/graph'

/**
 * Get shortest path
 * @param  {Object}   params
 * @param  {Object}   params.nodesConnections           Normalised array of nodes with related in and out connections
 * @param  {Object}   params.triplesPerNode             List of triples per node
 * @param  {Object}   params.availableNodes             VisJs Dataset of nodes IDs
 * @param  {Object}   params.availableNodesNormalised   Available nodes data
 * @return { undefined }
 */
const highlightSpiderableNodes = ({
  nodesConnections, // get id from it to check
  triplesPerNode,
  availableNodes,
  availableNodesNormalised
}) => {
  const availableNodesIDs = Object.keys(availableNodesNormalised)

  if (availableNodesIDs.length > 0) {
    availableNodesIDs.map((nodeId) => {
      const currentNodeConnections = nodesConnections[nodeId]?.length
      const totalNodesConnections = triplesPerNode[nodeId]?.length

      if (currentNodeConnections < totalNodesConnections) {
      // if (currentNodeConnections === totalNodesConnections) {
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
