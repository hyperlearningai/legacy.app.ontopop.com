import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight selected node
 * @param  {Object}   params
 * @param  {String}   params.selectedNode           Selected node ID
 * @param  {Function} params.setStoreState          setStoreState action
 * @return { undefined }
 */
const highlightSelectedNode = ({
  setStoreState,
  selectedNode
}) => {
  const {
    userDefinedNodeStyling,
    globalNodeStyling,
    network
  } = store.getState()

  const node = getNode(selectedNode)

  setStoreState('prevSelectedNode', node)

  const color = node.color || {}

  const { stylingNodeHighlightBackgroundColor } = node.userDefined ? userDefinedNodeStyling : globalNodeStyling
  color.background = stylingNodeHighlightBackgroundColor

  updateNodes({
    id: selectedNode,
    color
  })

  network.focus(selectedNode,
    {
      scale: 1,
      animation: true
    })
}

export default highlightSelectedNode
