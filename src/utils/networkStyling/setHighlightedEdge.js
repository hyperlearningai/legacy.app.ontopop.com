import store from '../../store'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import getStylingProperty from './getStylingProperty'

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
  } = store.getState()

  if (highlightedEdges.length === 0) return false

  const isHighlighted = highlightedEdges.includes(edge.id)

  if (!isHighlighted) return false

  const color = edge.color || {}

  color.color = getStylingProperty({
    type: 'edge',
    property: 'stylingEdgeLineColorHighlight',
    element: edge
  })

  return updateEdges({
    id: edge.id,
    color
  })
}

export default setHighlightedEdge
