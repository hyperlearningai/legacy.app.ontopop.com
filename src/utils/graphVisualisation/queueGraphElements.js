import store from '../../store'
import clearNodes from '../nodesEdgesUtils/clearNodes'
import clearEdges from '../nodesEdgesUtils/clearEdges'
import addElementToGraph from './addElementToGraph'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Function} params.setStoreState           setStoreState action
 * @param  {Function} params.addNumber               addNumber action
 * @return { undefined }
 */
const queueGraphElements = ({
  setStoreState,
  addNumber
}) => {
  const {
    classesFromApi,
    nodesIdsToDisplay,
    objectPropertiesFromApi,
    totalEdgesPerNode,
    globalNodeStyling,
    userDefinedNodeStyling,
    globalEdgeStyling,
    userDefinedEdgeStyling,
    isPhysicsOn,
  } = store.getState()

  if (!nodesIdsToDisplay || nodesIdsToDisplay.length === 0) return false

  // reset nodes and edges count
  setStoreState('availableNodesCount', 0)
  setStoreState('availableEdgesCount', 0)

  const currentPhysicsOnState = isPhysicsOn

  // turn physics off to speed up loading time when restoring large graphsa
  if (currentPhysicsOnState) {
    setStoreState('isPhysicsOn', false)
  }

  // reset nodes/edges (display at the end of the function)
  clearEdges()
  clearNodes()

  const nodesEdges = {}

  const processedEdges = []
  const nodeIdsLength = nodesIdsToDisplay.length

  addNumber('activeLoaders', 1)

  for (let i = 0; i < nodeIdsLength; i++) {
    setTimeout(() => addElementToGraph({
      classesFromApi,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      totalEdgesPerNode,
      globalNodeStyling,
      userDefinedNodeStyling,
      globalEdgeStyling,
      userDefinedEdgeStyling,
      setStoreState,
      i,
      nodeIdsLength,
      nodesEdges,
      processedEdges,
      addNumber,
    }), 1)
  }
}

export default queueGraphElements
