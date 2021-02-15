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
const highlightElement = ({
  setStoreState
}) => {
  const {
    freeTextSelection,
    freeTextSelectedElement,
    stylingNodeHighlightBackgroundColor,
    stylingEdgeLineColorHighlight,
    network
  } = store.getState()

  const elementType = freeTextSelection[freeTextSelectedElement]

  if (elementType === 'node') {
    const node = getNode(freeTextSelectedElement)

    setStoreState('freeTextPrevSelectedElement', node)

    const color = node.color || {}

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

  const edges = getEdge({
    filter: (edge) => edge.id.includes(freeTextSelectedElement)
  })

  if (edges && edges.length > 0) {
    setStoreState('freeTextPrevSelectedElement', edges)

    edges.map((edge) => {
      const color = edge.color || {}

      color.color = stylingEdgeLineColorHighlight

      return updateEdges(
        {
          id: edge.id,
          color,
          width: 3
        }
      )
    })

    network.fit({
      animation: true
    })
  }

  return true
}

export default highlightElement
