import { ALGO_TYPE_SHORTEST_PATH } from '../constants/algorithms'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import getShortestPath from './getShortestPath'
import store from '../store'

/**
 * Set shortest path
 * @param  {Object}   params
 * @param  {Boolean}  params.isNodeOverlay              Display nodes outside path flag
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.addToObject            Update graph data function
 * @return { undefined }
 */
const setShortestPath = async ({
  isNodeOverlay,
  setStoreState,
  addToObject,
}) => {
  const {
    availableEdgesNormalised,
    availableNodesNormalised,
    lastGraphIndex,
    nodesConnections,
    shortestPathSelectedNodes,
  } = store.getState()

  const shortestPathResults = await getShortestPath({
    shortestPathSelectedNodes,
    availableEdgesNormalised,
    availableNodesNormalised,
    nodesConnections
  })

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`
  const label = `shortest-path${isNodeOverlay ? '-full' : ''}-${newCurrentGraph}`

  const graphValue = {
    label,
    type: ALGO_TYPE_SHORTEST_PATH,
    options: {
      shortestPathSelectedNodes,
      shortestPathResults,
      isNodeOverlay
    }
  }

  addToObject('graphData', newCurrentGraph, graphValue)
  setStoreState('currentGraph', newCurrentGraph)
  setStoreState('lastGraphIndex', newGraphIndex)
  setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
}

export default setShortestPath
