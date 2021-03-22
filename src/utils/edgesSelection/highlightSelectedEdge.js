import store from '../../store'
import getStylingProperty from '../networkStyling/getStylingProperty'
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
    network
  } = store.getState()

  const edge = getEdge(selectedEdge)

  setStoreState('prevSelectedEdge', edge)

  const color = edge.color || {}

  color.color = getStylingProperty({
    type: 'edge',
    property: 'stylingEdgeLineColorHighlight',
    element: edge
  })

  const width = 3

  updateEdges({
    id: edge.id,
    color,
    width
  })

  network.focus(edge.from,
    {
      scale: 1,
      animation: false
    })
}

export default highlightSelectedEdge
