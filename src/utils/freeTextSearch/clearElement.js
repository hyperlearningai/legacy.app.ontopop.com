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
    freeTextPrevSelectedElement
  } = store.getState()

  if (!freeTextPrevSelectedElement) return false

  // check if edge
  if (Array.isArray(freeTextPrevSelectedElement)
  && freeTextPrevSelectedElement.length > 0
  ) {
    return freeTextPrevSelectedElement.map((edge) => {
      const color = edge.color || {}
      color.color = stylingEdgeLineColor

      return updateEdges(
        {
          id: edge.id,
          color,
          width: 1
        }
      )
    })
  }

  const { id } = freeTextPrevSelectedElement

  const color = freeTextPrevSelectedElement.color || {}
  color.background = stylingNodeBackgroundColor

  return updateNodes({
    id,
    color
  })
}

export default clearElement
