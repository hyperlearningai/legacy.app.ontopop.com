import { getEdgeUniqueId } from '../../constants/functions'
import store from '../../store'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Update nodes style recursively
 * @return {undefined}
 */
const updateEdgesStyle = () => {
  const {
    stylingEdgeCaptionProperty,
    objectPropertiesFromApi
  } = store.getState()

  const availableEdgesIds = getEdgeIds()

  if (availableEdgesIds.length > 0) {
    availableEdgesIds.map((edgeId) => {
      const predicate = getEdgeUniqueId(edgeId)

      const label = objectPropertiesFromApi[predicate][stylingEdgeCaptionProperty]

      const edgeUpdatedObject = {
        id: edgeId,
        label: label ? label.split(/ /g).join('\n') : ''
      }

      updateEdges(edgeUpdatedObject)

      return true
    })
  }
}

export default updateEdgesStyle
