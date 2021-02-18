import { SPIDERABLE_NODE_BORDER_COLOR, SPIDERABLE_NODE_BORDER_WIDTH } from '../../constants/graph'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight spiderable node borders
 * @param  {Object}   params
 * @param  {String}   params.nodeId           Node ID
 * @return { undefined }
 */
const highlightSpiderableNode = ({
  nodeId
}) => {
  const {
    nodesConnections,
    triplesPerNode,
  } = store.getState()

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
}

export default highlightSpiderableNode
