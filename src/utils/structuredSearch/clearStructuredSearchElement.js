import store from '../../store'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Clear free text selected elements in canvas
 * @return { undefined }
 */
const clearStructuredSearchElement = () => {
  const {
    stylingNodeBackgroundColor,
    stylingEdgeLineColor,
    structuredPrevSelectedElement,
    structuredSelection
  } = store.getState()

  if (!structuredPrevSelectedElement) return false

  const { id } = structuredPrevSelectedElement
  const color = structuredPrevSelectedElement.color || {}

  const type = structuredSelection[id]

  if (type === 'edge') {
    color.color = stylingEdgeLineColor

    return updateEdges(
      {
        id,
        color,
        width: 1
      }
    )
  }

  color.background = stylingNodeBackgroundColor

  return updateNodes({
    id,
    color
  })
}

export default clearStructuredSearchElement
