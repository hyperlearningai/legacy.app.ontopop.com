import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Set node background as highlighted
 * @param  {Object}   params
 * @param  {String}   params.node           Node object
 * @return { undefined }
 */
const setHighlightedNode = ({
  node
}) => {
  const {
    highlightedNodes,
    globalNodeStyling,
    userDefinedNodeStyling
  } = store.getState()

  if (highlightedNodes.length === 0) return false

  const { id, userDefined } = node

  const isHighlighted = highlightedNodes.includes(id)

  if (!isHighlighted) return false

  const color = node.color || {}

  const { stylingNodeHighlightBackgroundColor } = userDefined ? userDefinedNodeStyling : globalNodeStyling

  color.background = stylingNodeHighlightBackgroundColor

  return updateNodes({
    id,
    color
  })
}

export default setHighlightedNode
