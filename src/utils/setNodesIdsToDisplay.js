import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD,
  ALGO_TYPE_SHORTEST_PATH,
  ALGO_TYPE_BOUNDING_BOX,
  ALGO_TYPE_NODES_FILTER,
  ALGO_TYPE_EDGES_FILTER
} from '../constants/algorithms'
import getNodesEdgesFromPaths from './getNodesEdgesFromPaths'
import getNeighbours from './getNeighbours'
import getBoundingBoxEdges from './getBoundingBoxEdges'
import getNodesFromNodesFilters from './getNodesFromNodesFilters'
import getNodesEdgesFromEdgesFilters from './getNodesEdgesFromEdgesFilters'
import store from '../store'

/**
 * Updates nodes and edges to display
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {String}   params.type                      type of algorithm to use
 * @param  {Object}   params.options                   additional options
 * @return { undefined }
 */
const setNodesIdsToDisplay = async ({
  type,
  setStoreState,
  options
}) => {
  const {
    classesFromApi,
    objectPropertiesFromApi,
    nodesIdsToDisplay,
    deletedNodes
  } = store.getState()

  setStoreState('highlightedNodes', [])
  setStoreState('isNodeOverlay', false)

  if (type === ALGO_TYPE_FULL) {
    const classesIds = Object.keys(classesFromApi)
    const predicatesIds = Object.keys(objectPropertiesFromApi)

    setStoreState('edgesIdsToDisplay', predicatesIds)
    setStoreState('nodesIdsToDisplay', classesIds.filter((nodeId) => !deletedNodes.includes(nodeId)))
  }

  if (type === ALGO_TYPE_BOUNDING_BOX) {
    if (!options) return false

    const {
      selectedBoundingBoxNodes,
      triplesPerNode
    } = options

    const boundingBoxEdges = getBoundingBoxEdges({
      selectedBoundingBoxNodes,
      classesFromApi,
      triplesPerNode
    })

    setStoreState('highlightedNodes', [])
    setStoreState('edgesIdsToDisplay', boundingBoxEdges)
    setStoreState('nodesIdsToDisplay', selectedBoundingBoxNodes.filter((nodeId) => !deletedNodes.includes(nodeId)))
  }

  if (type === ALGO_TYPE_NEIGHBOURHOOD) {
    if (!options) return false

    const {
      selectedNodeId,
      separationDegree,
      triplesPerNode
    } = options

    const {
      neighbourNodes,
      neighbourEdges
    } = getNeighbours({
      selectedNodeId,
      separationDegree,
      classesFromApi,
      triplesPerNode
    })

    setStoreState('highlightedNodes', [selectedNodeId])
    setStoreState('edgesIdsToDisplay', neighbourEdges)
    setStoreState('nodesIdsToDisplay', neighbourNodes.filter((nodeId) => !deletedNodes.includes(nodeId)))
  }

  if (type === ALGO_TYPE_SHORTEST_PATH) {
    if (!options) return false

    const {
      shortestPathSelectedNodes,
      shortestPathResults,
      isNodeOverlay
    } = options

    const {
      shortestPathEdges,
      shortestPathNodes
    } = await getNodesEdgesFromPaths({ shortestPathResults })

    setStoreState('shortestPathResults', shortestPathResults)
    setStoreState('isNodeOverlay', isNodeOverlay)
    setStoreState('highlightedNodes', shortestPathSelectedNodes.filter((nodeId) => !deletedNodes.includes(nodeId)))

    if (!isNodeOverlay) {
      setStoreState('edgesIdsToDisplay', shortestPathEdges)
      setStoreState('nodesIdsToDisplay', shortestPathNodes.filter((nodeId) => !deletedNodes.includes(nodeId)))
    } else {
      // duplicated array to trigger new graph
      setStoreState('nodesIdsToDisplay', nodesIdsToDisplay.slice().filter((nodeId) => !deletedNodes.includes(nodeId)))
    }
  }

  if (type === ALGO_TYPE_NODES_FILTER) {
    if (!options) return false

    const {
      nodesFilters
    } = options

    const nodesToDisplay = await getNodesFromNodesFilters({ nodesFilters })

    setStoreState('nodesIdsToDisplay', nodesToDisplay.filter((nodeId) => !deletedNodes.includes(nodeId)))
  }

  if (type === ALGO_TYPE_EDGES_FILTER) {
    if (!options) return false

    const {
      edgesFilters
    } = options

    const {
      edgesToDisplay,
      nodesToDisplay
    } = await getNodesEdgesFromEdgesFilters({ edgesFilters })

    setStoreState('edgesIdsToDisplay', edgesToDisplay)
    setStoreState('nodesIdsToDisplay', nodesToDisplay.filter((nodeId) => !deletedNodes.includes(nodeId)))
  }

  return true
}

export default setNodesIdsToDisplay
