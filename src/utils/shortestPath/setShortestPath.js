import { ALGO_TYPE_SHORTEST_PATH } from '../../constants/algorithms'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import getShortestPath from './getShortestPath'
import store from '../../store'
import { DEFAULT_GRAPH_VISUALISATION_OPTIONS } from '../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Set shortest path
 * @param  {Object}   params
 * @param  {Boolean}  params.isNodeOverlay              Display nodes outside path flag
 * @param  {Boolean}  params.isUpperOntology            Display upper ontology nodes flag
 * @param  {Function} params.updateStoreValue              updateStoreValue action
 * @param  {Array}    params.nodesToExclude             Node IDs to exclude
 * @param  {Array}    params.edgesToExclude             Edge labels to exclude
 * @return { undefined }
 */
const setShortestPath = async ({
  isNodeOverlay,
  updateStoreValue,
  nodesToExclude,
  edgesToExclude,
  isUpperOntology
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
    edgesToExclude,
    isUpperOntology
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
    },
    ...DEFAULT_GRAPH_VISUALISATION_OPTIONS,
    isUpperOntologyVisible: isUpperOntology
  }

  updateStoreValue(['graphData', newCurrentGraph], OPERATION_TYPE_UPDATE, graphValue)
  updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, newCurrentGraph)
  updateStoreValue(['lastGraphIndex'], OPERATION_TYPE_UPDATE, newGraphIndex)
  updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_GRAPHS)
}

export default setShortestPath
