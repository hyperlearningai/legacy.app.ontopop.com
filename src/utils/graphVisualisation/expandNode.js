import store from '../../store'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../constants/store'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'
import checkNodeVisibility from '../networkGraphOptions/checkNodeVisibility'
import setNodeStyle from '../networkStyling/setNodeStyle'
import addNodeToGraph from './addNodeToGraph'

/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId                   Selected node id
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @return {undefined}
 */
const expandNode = ({
  nodeId,
  updateStoreValue,
}) => {
  const {
    totalEdgesPerNode,
    objectPropertiesFromApi,
    classesFromApi,
  } = store.getState()

  const existingNodes = getNodeIds()
  const existingEdges = getEdgeIds()

  const nodeEdges = totalEdgesPerNode[nodeId]

  const nodesToDisplay = []

  const visibleEdges = nodeEdges.filter((edgeId) => {
    if (existingEdges.includes(edgeId)) return false

    const {
      from,
      to
    } = objectPropertiesFromApi[edgeId]

    const nodeToCheck = from === nodeId ? to : from

    if (existingNodes.includes(nodeToCheck)) return false

    const isNodeVisible = checkNodeVisibility({
      nodeId: nodeToCheck
    })

    if (!isNodeVisible) return false

    const isEdgevisible = checkEdgeVisibility({
      edgeId
    })

    if (!isEdgevisible) return false

    nodesToDisplay.push(nodeToCheck)

    return true
  })

  // update selected node spiderability
  const isNotSpiderable = nodeEdges.every((edgeId) => visibleEdges.includes(edgeId) || existingEdges.includes(edgeId))

  updateStoreValue(['nodesSpiderability', nodeId], OPERATION_TYPE_UPDATE, isNotSpiderable ? 'false' : 'hidden')
  setNodeStyle({ node: classesFromApi[nodeId] })

  if (nodesToDisplay.length === 0) return false

  updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, 1)

  // add new nodes and edges
  const nodesToDisplayLength = nodesToDisplay.length - 1

  for (let index = nodesToDisplayLength; index >= 0; index--) {
    const invertedIndex = nodesToDisplayLength - index
    const currentNodeId = nodesToDisplay[invertedIndex]

    const isLast = invertedIndex === nodesToDisplay.length - 1

    if (index > 50) {
      setTimeout(() => addNodeToGraph({
        updateStoreValue,
        nodeId: currentNodeId,
        visibleEdges,
        isLast,
        isSpidered: true,
        existingEdges
      }), 0.001)
    } else {
      addNodeToGraph({
        updateStoreValue,
        nodeId: currentNodeId,
        visibleEdges,
        isLast,
        isSpidered: true,
        existingEdges
      })
    }
  }
}

export default expandNode
