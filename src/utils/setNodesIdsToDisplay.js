import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD,
  ALGO_TYPE_SHORTEST_PATH,
  ALGO_TYPE_BOUNDING_BOX
} from '../constants/algorithms'
import getNodesEdgesFromPaths from './getNodesEdgesFromPaths'
import getNeighbours from './getNeighbours'
import getBoundingBoxEdges from './getBoundingBoxEdges'
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
    nodesIdsToDisplay
  } = store.getState()

  setStoreState('highlightedNodes', [])
  setStoreState('isNodeOverlay', false)

  if (type === ALGO_TYPE_FULL) {
    const classesIds = Object.keys(classesFromApi)
    const predicatesIds = Object.keys(objectPropertiesFromApi)

    setStoreState('edgesIdsToDisplay', predicatesIds)
    setStoreState('nodesIdsToDisplay', classesIds)
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
    setStoreState('nodesIdsToDisplay', selectedBoundingBoxNodes)
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
    setStoreState('nodesIdsToDisplay', neighbourNodes)
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
    setStoreState('highlightedNodes', shortestPathSelectedNodes)

    if (!isNodeOverlay) {
      setStoreState('edgesIdsToDisplay', shortestPathEdges)
      setStoreState('nodesIdsToDisplay', shortestPathNodes)
    } else {
      // duplicated array to trigger new graph
      setStoreState('nodesIdsToDisplay', nodesIdsToDisplay.slice())
    }
  }

  return true
}

export default setNodesIdsToDisplay
