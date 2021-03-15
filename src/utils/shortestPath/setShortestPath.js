import { ALGO_TYPE_SHORTEST_PATH } from '../../constants/algorithms'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import getShortestPath from './getShortestPath'
import store from '../../store'

/**
 * Set shortest path
 * @param  {Object}   params
 * @param  {Boolean}  params.isNodeOverlay              Display nodes outside path flag
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.addToObject                Update graph data function
 * @param  {Array}    params.nodesToExclude             Node IDs to exclude
 * @param  {Array}    params.edgesToExclude             Edge labels to exclude
 * @return { undefined }
 */
const setShortestPath = async ({
  isNodeOverlay,
  setStoreState,
  addToObject,
  nodesToExclude,
  edgesToExclude
}) => {
  const {
    lastGraphIndex,
    nodesEdges,
    shortestPathNode1,
    shortestPathNode2
  } = store.getState()

  const shortestPathSelectedNodes = [
    shortestPathNode1,
    shortestPathNode2
  ]

  const shortestPathResults = await getShortestPath({
    shortestPathSelectedNodes,
    nodesEdges,
    nodesToExclude,
    edgesToExclude
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
