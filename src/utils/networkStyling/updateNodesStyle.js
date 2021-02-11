import store from '../../store'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Update nodes style recursively
 * @return {undefined}
 */
const updateNodesStyle = () => {
  const {
    stylingNodeCaptionProperty,
    classesFromApi
  } = store.getState()

  const availableNodesIds = getNodeIds()

  if (availableNodesIds.length > 0) {
    availableNodesIds.map((nodeId) => {
      const label = classesFromApi[nodeId][stylingNodeCaptionProperty]

      const nodeUpdatedObject = {
        id: nodeId,
        label: label ? label.split(/ /g).join('\n') : ''
      }

      updateNodes(nodeUpdatedObject)

      return true
    })
  }
}

export default updateNodesStyle
