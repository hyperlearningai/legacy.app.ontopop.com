import store from '../../store'
import clearNodes from '../nodesEdgesUtils/clearNodes'
import clearEdges from '../nodesEdgesUtils/clearEdges'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../constants/store'
import checkNodeVisibility from '../networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'
import addNodeToGraph from './addNodeToGraph'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue                   updateStoreValue action
 * @return { undefined }
 */
const addNodesToGraph = ({
  updateStoreValue
}) => {
  const {
    nodesIdsToDisplay,
    objectPropertiesFromApi,
    isPhysicsOn,
    currentGraph
  } = store.getState()

  if (!nodesIdsToDisplay || nodesIdsToDisplay.length === 0) return false

  // reset nodes/edges (display at the end of the function)
  clearEdges()
  clearNodes()
  updateStoreValue(['dataTableTriples'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['dataTableTriplesWithLabels'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['nodesDropdownLabels'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['edgesDropdownLabels'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['availableNodesCount'], OPERATION_TYPE_UPDATE, 0)
  updateStoreValue(['availableEdgesCount'], OPERATION_TYPE_UPDATE, 0)
  updateStoreValue(['graphData', currentGraph, 'nodesIdsToDisplay'], OPERATION_TYPE_UPDATE, nodesIdsToDisplay)

  const currentPhysicsOnState = isPhysicsOn

  // turn physics off to speed up loading time when restoring large graphsa
  if (currentPhysicsOnState) {
    updateStoreValue(['isPhysicsOn'], OPERATION_TYPE_UPDATE, false)
  }

  const visibleNodes = nodesIdsToDisplay.filter((nodeId) => checkNodeVisibility({
    nodeId
  }))

  if (!visibleNodes || visibleNodes.length === 0) return false

  updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, 1)

  const edgeIdsToDisplay = Object.keys(objectPropertiesFromApi).filter((edgeId) => {
    const { from, to } = objectPropertiesFromApi[edgeId]

    return visibleNodes.includes(from) && visibleNodes.includes(to)
  })

  const visibleEdges = edgeIdsToDisplay.filter((edgeId) => checkEdgeVisibility({
    edgeId
  }))

  const visibleNodesLength = visibleNodes.length - 1

  for (let index = visibleNodesLength; index >= 0; index--) {
    const invertedIndex = visibleNodesLength - index
    const nodeId = visibleNodes[invertedIndex]

    const isLast = invertedIndex === visibleNodes.length - 1

    if (index > 100) {
      setTimeout(() => addNodeToGraph({
        updateStoreValue,
        nodeId,
        visibleEdges,
        isLast
      }), 0.01)
    } else {
      addNodeToGraph({
        updateStoreValue,
        nodeId,
        visibleEdges,
        isLast
      })
    }
  }
}

export default addNodesToGraph
