import { ALGO_TYPE_NODES_FILTER } from '../../constants/algorithms'
import { ROUTE_NETWORK_GRAPHS } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import store from '../../store'
import setPageView from '../analytics/setPageView'

/**
 * Set neighbout nodes
 * @param  {Object}   params
 * @param  {Array}    params.nodesFilters              Array of node filters {property [string], value [string]}
 * @param  {Function} params.updateStoreValue             updateStoreValue action
 * @return
 */
const setFilteredNodes = ({
  updateStoreValue,
  nodesFilters,
}) => {
  const {
    lastGraphIndex,
    graphData,
    currentGraph
  } = store.getState()

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const label = `nodes-filter-${newCurrentGraph}`

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
    type: ALGO_TYPE_NODES_FILTER,
    options: {
      nodesFilters
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

export default setFilteredNodes
