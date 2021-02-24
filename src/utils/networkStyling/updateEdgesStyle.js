import store from '../../store'
import getEdge from '../nodesEdgesUtils/getEdge'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Update nodes style recursively
 * @return {undefined}
 */
const updateEdgesStyle = () => {
  const {
    stylingEdgeCaptionProperty,
  } = store.getState()

  const availableEdgesIds = getEdgeIds()

  if (availableEdgesIds.length > 0) {
    availableEdgesIds.map((edgeId) => {
      const edge = getEdge(edgeId)

      const label = edge[stylingEdgeCaptionProperty] ? edge[stylingEdgeCaptionProperty] : ''

      const edgeUpdatedObject = {
        id: edgeId,
        label
      }

      updateEdges(edgeUpdatedObject)

      return true
    })
  }
}

export default updateEdgesStyle
