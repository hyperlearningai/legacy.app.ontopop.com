import store from '../../store'
import clearNodes from '../nodesEdgesUtils/clearNodes'
import clearEdges from '../nodesEdgesUtils/clearEdges'
import addElementToGraph from './addElementToGraph'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue                   updateStoreValue action
 * @return { undefined }
 */
const queueGraphElements = ({
  updateStoreValue
}) => {
  const {
    classesFromApi,
    nodesIdsToDisplay,
    objectPropertiesFromApi,
    totalEdgesPerNode,
    isPhysicsOn,
    currentGraph
  } = store.getState()

  if (!nodesIdsToDisplay || nodesIdsToDisplay.length === 0) return false

  // reset nodes and edges count
  updateStoreValue(['availableNodesCount'], OPERATION_TYPE_UPDATE, 0)
  updateStoreValue(['availableEdgesCount'], OPERATION_TYPE_UPDATE, 0)
  updateStoreValue(['graphData', currentGraph, 'nodesIdsToDisplay'], OPERATION_TYPE_UPDATE, nodesIdsToDisplay)

  const currentPhysicsOnState = isPhysicsOn

  // turn physics off to speed up loading time when restoring large graphsa
  if (currentPhysicsOnState) {
    updateStoreValue(['isPhysicsOn'], OPERATION_TYPE_UPDATE, false)
  }

  // reset nodes/edges (display at the end of the function)
  clearEdges()
  clearNodes()

  const processedEdges = []
  const nodeIdsLength = nodesIdsToDisplay.length

  updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, 1)

  for (let i = 0; i < nodeIdsLength; i++) {
    setTimeout(() => addElementToGraph({
      updateStoreValue,
      classesFromApi,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      totalEdgesPerNode,
      i,
      nodeIdsLength,
      processedEdges,
    }), 1)
  }
}

export default queueGraphElements
