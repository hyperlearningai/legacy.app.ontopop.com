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
const highlightElement = ({
  updateStoreValue
}) => {
  const {
    freeTextSelection,
    freeTextSelectedElement,
    globalEdgeStyling,
    globalNodeStyling,
    userDefinedEdgeStyling,
    userDefinedNodeStyling,
    network
  } = store.getState()

  if (!freeTextSelectedElement) return false
  const { type, userDefined } = freeTextSelection[freeTextSelectedElement]

  if (type === 'node') {
    const node = getNode(freeTextSelectedElement)

    updateStoreValue(['freeTextPrevSelectedElement'], OPERATION_TYPE_UPDATE, node)

    const color = node.color || {}

    const { stylingNodeHighlightBackgroundColor } = userDefined ? userDefinedNodeStyling : globalNodeStyling

    color.background = stylingNodeHighlightBackgroundColor

    network.focus(freeTextSelectedElement,
      {
        scale: 2,
        animation: true
      })

    return updateNodes(
      { id: freeTextSelectedElement, color }
    )
  }

  const edge = getEdge(freeTextSelectedElement)

  updateStoreValue(['freeTextPrevSelectedElement'], OPERATION_TYPE_UPDATE, edge)

  const color = edge.color || {}

  const { stylingEdgeLineColorHighlight } = userDefined ? userDefinedEdgeStyling : globalEdgeStyling

  color.color = stylingEdgeLineColorHighlight

  updateEdges(
    {
      id: freeTextSelectedElement,
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

export default highlightElement
