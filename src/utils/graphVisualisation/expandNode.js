import store from '../../store'
import addExpandedNode from './addExpandedNode'
import getEdge from '../nodesEdgesUtils/getEdge'
import { OPERATION_TYPE_ADD } from '../../constants/store'
/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId                   Selected node id
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @return {undefined}
 */
const expandNode = ({
  nodeId,
  updateStoreValue
}) => {
  const {
    totalEdgesPerNode,
    objectPropertiesFromApi,
    classesFromApi,
  } = store.getState()

  const edges = totalEdgesPerNode[nodeId]

  if (edges?.length > 0) {
    updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, 1)

    for (let index = 0; index < edges.length; index++) {
      const edgeId = edges[index]
      const edge = getEdge(edgeId)

      if (edge !== null) continue

      const edgeObject = objectPropertiesFromApi[edgeId]

      setTimeout(() => addExpandedNode({
        nodeId,
        index,
        edgesNumber: edges.length,
        edge: edgeObject,
        updateStoreValue,
        classesFromApi,
      }), 1)
    }
  }
}

export default expandNode
