import store from '../../store'
import getEdge from '../nodesEdgesUtils/getEdge'
import getNode from '../nodesEdgesUtils/getNode'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Highlight selected element
 * @param  {Object}   params
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const highlightStructuredSearchElement = ({
  setStoreState
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

    setStoreState('structuredPrevSelectedElement', node)

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

  setStoreState('structuredPrevSelectedElement', edge)

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
