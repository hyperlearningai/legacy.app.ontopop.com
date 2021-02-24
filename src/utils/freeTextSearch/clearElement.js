import store from '../../store'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Clear free text selected elements in canvas
 * @return { undefined }
 */
const clearElement = () => {
  const {
    stylingNodeBackgroundColor,
    stylingEdgeLineColor,
    freeTextPrevSelectedElement,
    freeTextSelection
  } = store.getState()

  if (!freeTextPrevSelectedElement) return false

  const { id } = freeTextPrevSelectedElement
  const color = freeTextPrevSelectedElement.color || {}

  const type = freeTextSelection[id]

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

export default clearElement
