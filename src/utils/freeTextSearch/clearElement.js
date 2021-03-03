import store from '../../store'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Clear free text selected elements in canvas
 * @return { undefined }
 */
const clearElement = () => {
  const {
    userDefinedNodeStyling,
    globalNodeStyling,
    userDefinedEdgeStyling,
    globalEdgeStyling,
    freeTextPrevSelectedElement,
    freeTextSelection
  } = store.getState()

  if (!freeTextPrevSelectedElement) return false

  const { id, userDefined } = freeTextPrevSelectedElement
  const color = freeTextPrevSelectedElement.color || {}
  const width = freeTextPrevSelectedElement.width || 1

  if (!freeTextSelection[id]) return false

  const { type } = freeTextSelection[id]

  if (type === 'edge') {
    const { stylingEdgeLineColor } = userDefined ? userDefinedEdgeStyling : globalEdgeStyling
    color.color = stylingEdgeLineColor

    return updateEdges(
      {
        id,
        color,
        width
      }
    )
  }

  const { stylingNodeBackgroundColor } = userDefined ? userDefinedNodeStyling : globalNodeStyling

  color.background = stylingNodeBackgroundColor

  return updateNodes({
    id,
    color
  })
}

export default clearElement
