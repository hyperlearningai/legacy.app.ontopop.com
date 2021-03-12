import store from '../../store'
import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Highlight selected edges
 * @param  {Object}   params
 * @param  {String}   params.selectedEdge           Selected edge ID
 * @param  {Function} params.setStoreState          setStoreState action
 * @return { undefined }
 */
const highlightSelectedEdge = ({
  setStoreState,
  selectedEdge
}) => {
  const {
    userDefinedEdgeStyling,
    globalEdgeStyling,
    network
  } = store.getState()

  const edge = getEdge(selectedEdge)

  setStoreState('prevSelectedEdge', edge)

  const color = edge.color || {}

  const { stylingEdgeLineColorHighlight } = edge.userDefined
    ? userDefinedEdgeStyling : globalEdgeStyling
  color.color = stylingEdgeLineColorHighlight
  const width = 3

  updateEdges({
    id: edge.id,
    color,
    width
  })

  network.focus(edge.from,
    {
      scale: 1,
      animation: true
    })
}

export default highlightSelectedEdge
