import setHighlightedNode from './setHighlightedNode'
import setNodeOverlay from './setNodeOverlay'
import setNodeStylesByProperty from './setNodeStylesByProperty'
import highlightSpiderableNode from './highlightSpiderableNode'
import setUserDefinedNodeStyle from './setUserDefinedNodeStyle'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {String}   params.nodeId           Node Id
 * @return { undefined }
 */
const setNodeStyle = ({
  nodeId,
}) => {
  // update nodes style by property
  setUserDefinedNodeStyle({
    nodeId
  })

  // update nodes style by property
  setNodeStylesByProperty({
    nodeId
  })

  // check if highlighted nodes
  setHighlightedNode({
    nodeId
  })

  // node overlay
  setNodeOverlay({
    nodeId
  })

  // check if nodes are spiderable
  highlightSpiderableNode({
    nodeId
  })
}

export default setNodeStyle
