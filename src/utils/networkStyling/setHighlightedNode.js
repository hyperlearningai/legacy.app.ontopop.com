import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Set node background as highlighted
 * @param  {Object}   params
 * @param  {String}   params.nodeId           Node ID
 * @return { undefined }
 */
const setHighlightedNode = ({
  nodeId
}) => {
  const {
    highlightedNodes,
    stylingNodeHighlightBackgroundColor
  } = store.getState()

  if (highlightedNodes.length === 0) return false

  const isHighlighted = highlightedNodes.includes(nodeId)

  if (!isHighlighted) return false

  const node = getNode(nodeId)

  const color = node.color || {}

  color.background = stylingNodeHighlightBackgroundColor

  return updateNodes({
    id: nodeId,
    color
  })
}

export default setHighlightedNode
