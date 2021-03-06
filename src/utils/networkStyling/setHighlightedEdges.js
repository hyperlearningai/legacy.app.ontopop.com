import store from '../../store'
import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Set edge color as highlighted
 * @return { undefined }
 */
const setHighlightedEdges = () => {
  const {
    highlightedEdges,
    globalEdgeStyling,
    userDefinedEdgeStyling
  } = store.getState()

  if (highlightedEdges.length === 0) return false

  const highlightedEdgesObjects = getEdge({
    filter: (edge) => highlightedEdges.includes(edge.id)
  })

  if (highlightedEdgesObjects.length === 0) return false

  highlightedEdgesObjects.map((edge) => {
    const color = edge.color || {}

    const { stylingEdgeLineColorHighlight } = edge.userDefined ? userDefinedEdgeStyling : globalEdgeStyling

    color.color = stylingEdgeLineColorHighlight

    return updateEdges({
      id: edge.id,
      color
    })
  })
}

export default setHighlightedEdges
