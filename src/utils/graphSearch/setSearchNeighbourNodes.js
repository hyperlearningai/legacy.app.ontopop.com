import { ALGO_TYPE_SEARCH_NEIGHBOURHOOD } from '../../constants/algorithms'
import { ROUTE_NETWORK_GRAPHS } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import store from '../../store'
import setPageView from '../analytics/setPageView'

/**
 * Set neighbout nodes
 * @param  {Object}   params
 * @param  {Number}   params.separationDegree          Separation degree integer
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @param  {Object}   params.searchResult              Selected node or edge object
 * @return { undefined }
 */
const setSearchNeighbourNodes = ({
  separationDegree,
  updateStoreValue,
  searchResult,
}) => {
  const {
    lastGraphIndex,
    graphData,
    currentGraph
  } = store.getState()

  const {
    id,
    type,
    from,
    to
  } = searchResult

  const selectedNodesId = []
  const selectedEdgesId = []
  updateStoreValue(['nodesIdsToDisplay'], OPERATION_TYPE_UPDATE, [])

  if (type === 'edge') {
    selectedEdgesId.push(id)

    selectedNodesId.push(from)
    selectedNodesId.push(to)
  } else {
    selectedNodesId.push(id)
  }

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const label = `search-${newCurrentGraph}`

  const {
    isUserDefinedNodeVisible,
    isOrphanNodeVisible,
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties
  } = graphData[currentGraph]

  const graphValue = {
    label,
    type: ALGO_TYPE_SEARCH_NEIGHBOURHOOD,
    options: {
      selectedNodesId,
      selectedEdgesId,
      separationDegree,
    },
    isUserDefinedNodeVisible,
    isOrphanNodeVisible,
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties
  }

  updateStoreValue(['graphData', newCurrentGraph], OPERATION_TYPE_UPDATE, graphValue)
  updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, newCurrentGraph)
  updateStoreValue(['lastGraphIndex'], OPERATION_TYPE_UPDATE, newGraphIndex)
  updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_GRAPHS)
  window.history.pushState('', '', ROUTE_NETWORK_GRAPHS)
  setPageView({ url: ROUTE_NETWORK_GRAPHS, updateStoreValue })
}

export default setSearchNeighbourNodes
