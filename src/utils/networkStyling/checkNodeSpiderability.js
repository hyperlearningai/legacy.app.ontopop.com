import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import setNodeStyle from './setNodeStyle'

/**
 * Highlight spiderable node borders
 * @param  {Object}   params
 * @param  {Object}   params.node           Node object
 * @return { undefined }
 */
const checkNodeSpiderability = ({
  nodeId,
  updateStoreValue,
  visibleEdges
}) => {
  const {
    totalEdgesPerNode,
  } = store.getState()

  const nodeEdges = totalEdgesPerNode[nodeId]

  let isNotSpiderable = true

  if (nodeEdges) {
    isNotSpiderable = nodeEdges.every((edgeId) => visibleEdges.includes(edgeId))
  }

  updateStoreValue(['nodesSpiderability', nodeId], OPERATION_TYPE_UPDATE, isNotSpiderable ? 'false' : 'true')

  setNodeStyle({
    nodeId,
  })
}

export default checkNodeSpiderability
