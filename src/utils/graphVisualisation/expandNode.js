import store from '../../store'
import addExpandedNode from './addExpandedNode'
import getEdge from '../nodesEdgesUtils/getEdge'
/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId                   Selected node id
 * @param  {Function} params.setStoreState            setStoreState action
 * @param  {Function} params.addNumber                addNumber action
 * @param  {Function} params.toggleFromSubArray       toggleFromSubArray action
 * @param  {Function} params.toggleFromArrayInKey     toggleFromArrayInKey action
 * @return {undefined}
 */
const expandNode = ({
  nodeId,
  setStoreState,
  addNumber,
  toggleFromSubArray,
  toggleFromArrayInKey
}) => {
  const {
    totalEdgesPerNode,
    objectPropertiesFromApi,
    // nodesEdges,
    classesFromApi,
  } = store.getState()

  const edges = totalEdgesPerNode[nodeId]

  // const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))

  if (edges?.length > 0) {
    addNumber('activeLoaders', 1)

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
        // nodesEdges: newNodesEdges,
        setStoreState,
        classesFromApi,
        toggleFromSubArray,
        toggleFromArrayInKey,
        addNumber,
      }), 1)
    }
  }
}

export default expandNode
