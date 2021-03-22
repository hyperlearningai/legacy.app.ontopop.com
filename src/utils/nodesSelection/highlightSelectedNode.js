import store from '../../store'
import getStylingProperty from '../networkStyling/getStylingProperty'
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
    network
  } = store.getState()

  const node = getNode(selectedNode)

  setStoreState('prevSelectedNode', node)

  const color = node?.color || {}

  color.background = getStylingProperty({
    type: 'node',
    property: 'stylingNodeHighlightBackgroundColor',
    element: node
  })

  updateNodes({
    id: selectedNode,
    color
  })

  network.focus(selectedNode,
    {
      scale: 1,
      animation: false,
    })
}

export default highlightSelectedNode
