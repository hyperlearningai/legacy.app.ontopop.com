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
    stylingNodeHighlightBackgroundColor
  } = store.getState()

  const nodeProperties = getNode(selectedNode)

  setStoreState('prevSelectedNode', nodeProperties)

  const color = nodeProperties.color || {}
  color.background = stylingNodeHighlightBackgroundColor

  updateNodes({
    id: selectedNode,
    color
  })
}

export default highlightSelectedNode
