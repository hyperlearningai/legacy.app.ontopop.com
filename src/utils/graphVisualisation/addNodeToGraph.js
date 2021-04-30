import store from '../../store'
import { OPERATION_TYPE_PUSH, OPERATION_TYPE_UPDATE } from '../../constants/store'
import addNode from '../nodesEdgesUtils/addNode'
import actionAfterNodesAdded from './actionAfterNodesAdded'
import addEdgeToGraph from './addEdgeToGraph'

/**
 * Add node to graph
 * @param  {Object}   params
 * @param  {String}   params.nodeId                   Node ID
 * @param  {Array}    params.visibleEdges             Visible Edges array
 * @param  {Function} params.updateStoreValue         updateStoreValue action
 * @param  {Boolean}  params.isLast                   Is last node flag
 * @param  {Boolean}  [params.isSpidered]             Is spidered flag
 * @param  {Array}    [params.existingEdges]          Edges already visible
 * @return { undefined }
 */
const addNodeToGraph = ({
  updateStoreValue,
  nodeId,
  visibleEdges,
  isLast,
  isSpidered,
  existingEdges
}) => {
  const {
    classesFromApi,
    totalEdgesPerNode,
    currentGraph
  } = store.getState()

  const nodeEdges = totalEdgesPerNode[nodeId]

  let isNotSpiderable = true

  if (nodeEdges) {
    if (isSpidered) {
      isNotSpiderable = nodeEdges.every((edgeId) => visibleEdges.includes(edgeId) || existingEdges.includes(edgeId))
    } else {
      isNotSpiderable = nodeEdges.every((edgeId) => visibleEdges.includes(edgeId))
    }
  }

  updateStoreValue(['nodesSpiderability', nodeId], OPERATION_TYPE_UPDATE, isNotSpiderable ? 'false' : 'true')

  // add node
  const nodeIdObject = classesFromApi[nodeId]

  addNode({
    node: nodeIdObject,
    updateStoreValue,
  })

  if (isSpidered) {
    updateStoreValue(['graphData', currentGraph, 'nodesIds'], OPERATION_TYPE_PUSH, nodeId)
  }

  if (isLast) {
    const useTimeout = visibleEdges.length > 100

    if (visibleEdges.length === 0) {
      return actionAfterNodesAdded({
        updateStoreValue
      })
    }

    const visibleEdgesLength = visibleEdges.length - 1

    for (let index = visibleEdgesLength; index >= 0; index--) {
      const invertedIndex = visibleEdgesLength - index
      const edgeId = visibleEdges[invertedIndex]

      const isLastEdge = invertedIndex === visibleEdges.length - 1

      if (useTimeout && invertedIndex > 75) {
        setTimeout(() => addEdgeToGraph({
          updateStoreValue,
          edgeId,
          isLast: isLastEdge
        }), 0.01)
      } else {
        addEdgeToGraph({
          updateStoreValue,
          edgeId,
          isLast: isLastEdge
        })
      }
    }
  }
}

export default addNodeToGraph
