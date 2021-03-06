import store from '../../store'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Set edge color as highlighted
 * @param  {Object}   params
 * @param  {String}   params.edge           Edge object
 * @return { undefined }
 */
const setHighlightedEdge = ({
  edge
}) => {
  const {
    highlightedEdges,
    globalEdgeStyling,
    userDefinedEdgeStyling
  } = store.getState()

  if (highlightedEdges.length === 0) return false

  const isHighlighted = highlightedEdges.includes(edge.id)

  if (!isHighlighted) return false

  const color = edge.color || {}

  const { stylingEdgeLineColorHighlight } = edge.userDefined ? userDefinedEdgeStyling : globalEdgeStyling

  color.color = stylingEdgeLineColorHighlight

  return updateEdges({
    id: edge.id,
    color
  })
}

export default setHighlightedEdge
