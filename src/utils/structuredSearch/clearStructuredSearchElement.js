import store from '../../store'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Clear structured search selected elements in canvas
 * @return { undefined }
 */
const clearStructuredSearchElement = () => {
  const {
    userDefinedNodeStyling,
    globalNodeStyling,
    userDefinedEdgeStyling,
    globalEdgeStyling,
    structuredPrevSelectedElement,
    structuredSelection
  } = store.getState()

  if (!structuredPrevSelectedElement) return false

  const { id, userDefined } = structuredPrevSelectedElement
  const color = structuredPrevSelectedElement.color || {}
  const width = structuredPrevSelectedElement.width || 1

  if (!structuredSelection[id]) return false

  const { type } = structuredSelection[id]

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

export default clearStructuredSearchElement
