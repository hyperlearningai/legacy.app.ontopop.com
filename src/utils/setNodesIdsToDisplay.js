import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD,
  ALGO_TYPE_SHORTEST_PATH,
  ALGO_TYPE_BOUNDING_BOX,
  ALGO_TYPE_NODES_FILTER,
  ALGO_TYPE_EDGES_FILTER
} from '../constants/algorithms'
import getNodesEdgesFromPaths from './shortestPath/getNodesEdgesFromPaths'
import getNeighbours from './nodeNeighbourhood/getNeighbours'
import getBoundingBoxEdges from './boundingBoxSelection/getBoundingBoxEdges'
import getNodesFromNodesFilters from './nodesFilter/getNodesFromNodesFilters'
import getNodesEdgesFromEdgesFilters from './edgesFilter/getNodesEdgesFromEdgesFilters'
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
  setStoreState('shortestPathNodes', [])

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
    } = options

    const selectedBoundingBoxNodesIds = selectedBoundingBoxNodes.map((node) => node.id)

    const boundingBoxEdges = getBoundingBoxEdges({
      selectedBoundingBoxNodesIds,
    })

    setStoreState('highlightedNodes', [])
    setStoreState('edgesIdsToDisplay', boundingBoxEdges)
    setStoreState('nodesIdsToDisplay', selectedBoundingBoxNodesIds)
  }

  if (type === ALGO_TYPE_NEIGHBOURHOOD) {
    if (!options) return false

    const {
      selectedNodeId,
      separationDegree,
    } = options

    const {
      neighbourNodes,
      neighbourEdges
    } = getNeighbours({
      selectedNodeId,
      separationDegree,
    })

    setStoreState('highlightedNodes', [selectedNodeId])
    setStoreState('edgesIdsToDisplay', neighbourEdges)
    setStoreState('nodesIdsToDisplay', neighbourNodes)
  }

  if (type === ALGO_TYPE_SHORTEST_PATH) {
    if (!options) return false

    const {
      shortestPathSelectedNodes,
      shortestPathResults,
      isNodeOverlay
    } = options

    setStoreState('shortestPathResults', shortestPathResults)

    const {
      shortestPathEdges,
      shortestPathNodes
    } = await getNodesEdgesFromPaths()

    setStoreState('isNodeOverlay', isNodeOverlay)
    setStoreState('highlightedNodes', shortestPathSelectedNodes)

    if (!isNodeOverlay) {
      setStoreState('edgesIdsToDisplay', shortestPathEdges)
      setStoreState('nodesIdsToDisplay', shortestPathNodes)
    } else {
      // duplicated array to trigger new graph
      setStoreState('shortestPathNodes', shortestPathNodes)
      setStoreState('nodesIdsToDisplay', nodesIdsToDisplay.slice())
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
