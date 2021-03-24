import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import getEdge from '../nodesEdgesUtils/getEdge'
import getNode from '../nodesEdgesUtils/getNode'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight selected element
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @return { undefined }
 */
const highlightStructuredSearchElement = ({
  updateStoreValue
}) => {
  const {
    structuredSelection,
    structuredSelectedElement,
    globalEdgeStyling,
    globalNodeStyling,
    userDefinedEdgeStyling,
    userDefinedNodeStyling,
    network
  } = store.getState()

  if (!structuredSelectedElement) return false
  const { type, userDefined } = structuredSelection[structuredSelectedElement]

  if (type === 'node') {
    const node = getNode(structuredSelectedElement)

    updateStoreValue(['structuredPrevSelectedElement'], OPERATION_TYPE_UPDATE, node)

    const color = node.color || {}

    const { stylingNodeHighlightBackgroundColor } = userDefined ? userDefinedNodeStyling : globalNodeStyling

    color.background = stylingNodeHighlightBackgroundColor

    network.focus(structuredSelectedElement,
      {
        scale: 2,
        animation: true
      })

    return updateNodes(
      { id: structuredSelectedElement, color }
    )
  }

  const edge = getEdge(structuredSelectedElement)

  updateStoreValue(['structuredPrevSelectedElement'], OPERATION_TYPE_UPDATE, edge)

  const color = edge.color || {}

  const { stylingEdgeLineColorHighlight } = userDefined ? userDefinedEdgeStyling : globalEdgeStyling

  color.color = stylingEdgeLineColorHighlight

  updateEdges(
    {
      id: structuredSelectedElement,
      color,
      width: 3
    }
  )

  network.focus(edge.from,
    {
      scale: 1,
      animation: true
    })

  return true
}

export default highlightStructuredSearchElement
