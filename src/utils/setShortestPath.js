import { ALGO_TYPE_SHORTEST_PATH } from '../constants/algorithms'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import getShortestPath from './getShortestPath'
import store from '../store'

/**
 * Set shortest path
 * @param  {Object}   params
 * @param  {Boolean}  params.isNodeOverlay              Display nodes outside path flag
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.updateGraphData            Update graph data function
 * @return
 */
const setShortestPath = async ({
  isNodeOverlay,
  setStoreState,
  updateGraphData,
}) => {
  const {
    availableEdgesNormalised,
    availableNodesNormalised,
    lastGraphIndex,
    nodesConnections,
    shortestPathSelectedNodes,
  } = store.getState()

  const paths = await getShortestPath({
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
      paths,
      isNodeOverlay
    }
  }

  updateGraphData(newCurrentGraph, graphValue)
  setStoreState('currentGraph', newCurrentGraph)
  setStoreState('lastGraphIndex', newGraphIndex)
  setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
}

export default setShortestPath
