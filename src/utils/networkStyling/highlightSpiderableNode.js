import { SPIDERABLE_NODE_BORDER_COLOR, SPIDERABLE_NODE_BORDER_WIDTH } from '../../constants/graph'
import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight spiderable node borders
 * @param  {Object}   params
 * @param  {String}   params.node           Node object
 * @return { undefined }
 */
const highlightSpiderableNode = ({
  node
}) => {
  const {
    nodesEdges,
    totalEdgesPerNode,
    globalNodeStyling,
    userDefinedNodeStyling
  } = store.getState()

  const {
    id,
    userDefined
  } = node

  const {
    stylingNodeBorderColor,
    stylingNodeBorder
  } = userDefined ? userDefinedNodeStyling : globalNodeStyling

  const currentNodeConnections = nodesEdges[id]?.length
  const totalNodesEdges = totalEdgesPerNode[id]?.length

  let existingColorProperties

  if (node.color) {
    existingColorProperties = node.color
  }

  const isSpiderable = currentNodeConnections < totalNodesEdges

  updateNodes({
    id,
    color: {
      ...existingColorProperties,
      border: isSpiderable
        ? SPIDERABLE_NODE_BORDER_COLOR : stylingNodeBorderColor
    },
    borderWidth: isSpiderable
      ? SPIDERABLE_NODE_BORDER_WIDTH
      : stylingNodeBorder
  })
}

export default highlightSpiderableNode
