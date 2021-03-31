import setHighlightedNode from './setHighlightedNode'
import setNodeOverlay from './setNodeOverlay'
import setNodeStylesByProperty from './setNodeStylesByProperty'
import setUserDefinedNodeStyle from './setUserDefinedNodeStyle'
import resetNodeStyle from './resetNodeStyle'
import addNodeBorders from './addNodeBorders'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {String}   params.nodeId           Node Id
 * @return { undefined }
 */
const setNodeStyle = ({
  node,
}) => {
  if (!node) return false

  const { id, userDefined } = node

  if (userDefined) {
    setUserDefinedNodeStyle({
      node,
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

  // check if nodes are spiderable
  addNodeBorders({
    node,
  })
}

export default setNodeStyle
