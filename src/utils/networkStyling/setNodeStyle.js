import setHighlightedNode from './setHighlightedNode'
import setNodeOverlay from './setNodeOverlay'
import setNodeStylesByProperty from './setNodeStylesByProperty'
import highlightSpiderableNode from './highlightSpiderableNode'
import setUserDefinedNodeStyle from './setUserDefinedNodeStyle'
import resetNodeStyle from './resetNodeStyle'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {String}   params.nodeId           Node Id
 * @param  {Boolean}  params.skipSpider       Do not check if spiderable
 * @return { undefined }
 */
const setNodeStyle = ({
  node,
  skipSpider
}) => {
  if (!node) return false

  const { id, userDefined } = node

  if (userDefined) {
    setUserDefinedNodeStyle({
      node
    })
  } else {
    resetNodeStyle({
      node
    })
  }

  // update nodes style by property
  setNodeStylesByProperty({
    nodeId: id
  })

  // check if highlighted nodes
  setHighlightedNode({
    node
  })

  // node overlay
  setNodeOverlay({
    nodeId: id
  })

  if (skipSpider) return true

  // check if nodes are spiderable
  highlightSpiderableNode({
    node
  })
}

export default setNodeStyle
