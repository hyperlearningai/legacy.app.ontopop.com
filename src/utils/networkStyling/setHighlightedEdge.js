import { USER_DEFINED_PROPERTY } from '../../constants/graph'
import store from '../../store'
import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Set edge color as highlighted
 * @param  {Object}   params
 * @param  {String}   params.edgeId           Edge Id
 * @return { undefined }
 */
const setHighlightedEdges = ({
  edgeId
}) => {
  const {
    highlightedEdges,
    stylingEdgeLineColorHighlight
  } = store.getState()

  if (highlightedEdges.length === 0) return false

  const edge = getEdge(edgeId)

  if (!edge || !edge[USER_DEFINED_PROPERTY]) return false

  const color = edge.color || {}

  color.color = stylingEdgeLineColorHighlight

  return updateEdges({
    id: edge.id,
    color
  })
}

export default setHighlightedEdges
