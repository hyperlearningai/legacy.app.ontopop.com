import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import getStylingProperty from '../networkStyling/getStylingProperty'
import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Highlight selected edges
 * @param  {Object}   params
 * @param  {String}   params.selectedEdge           Selected edge ID
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @return { undefined }
 */
const highlightSelectedEdge = ({
  updateStoreValue,
  selectedEdge
}) => {
  const {
    network
  } = store.getState()

  const edge = getEdge(selectedEdge)

  updateStoreValue(['prevSelectedEdge'], OPERATION_TYPE_UPDATE, edge)

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
