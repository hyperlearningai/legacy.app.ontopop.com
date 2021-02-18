import store from '../../store'
import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import { getEdgeUniqueId } from '../../constants/functions'

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
    stylingEdgeLineColorHighlight
  } = store.getState()

  const edgeUniqueId = getEdgeUniqueId(selectedEdge)

  const edgeProperties = getEdge({
    filter: (edge) => edge.id.includes(edgeUniqueId)
  })

  setStoreState('prevSelectedEdges', edgeProperties)

  if (edgeProperties.length > 0) {
    edgeProperties.map((edgeProperty) => {
      const color = edgeProperty.color || {}
      color.color = stylingEdgeLineColorHighlight
      const width = 3

      return updateEdges({
        id: edgeProperty.id,
        color,
        width
      })
    })
  }
}

export default highlightSelectedEdge
