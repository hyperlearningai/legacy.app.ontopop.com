import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import getStylingProperty from '../networkStyling/getStylingProperty'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight selected node
 * @param  {Object}   params
 * @param  {String}   params.selectedNode           Selected node ID
 * @param  {Function} params.updateStoreValue       updateStoreValue action
 * @return { undefined }
 */
const highlightSelectedNode = ({
  updateStoreValue,
  selectedNode
}) => {
  const {
    network
  } = store.getState()

  const node = getNode(selectedNode)

  updateStoreValue(['prevSelectedNode'], OPERATION_TYPE_UPDATE, node)

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
