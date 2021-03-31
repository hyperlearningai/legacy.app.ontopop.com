import { ALGO_TYPE_EDGES_FILTER } from '../../constants/algorithms'
import { ROUTE_NETWORK_GRAPHS } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'

/**
 * Set neighbout edges
 * @param  {Object}   params
 * @param  {Array}    params.edgesFilters              Array of edge filters {property [string], value [string]}
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @param  {Class}    params.router                       router class
 * @return
 */
const setFilteredEdges = ({
  updateStoreValue,
  edgesFilters,
  router
}) => {
  const {
    lastGraphIndex,
    graphData,
    currentGraph
  } = store.getState()

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const label = `edges-filter-${newCurrentGraph}`

  const {
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties
  } = graphData[currentGraph]

  const graphValue = {
    label,
    type: ALGO_TYPE_EDGES_FILTER,
    options: {
      edgesFilters
    },
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties
  }

  updateStoreValue(['graphData', newCurrentGraph], OPERATION_TYPE_UPDATE, graphValue)
  updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, newCurrentGraph)
  updateStoreValue(['lastGraphIndex'], OPERATION_TYPE_UPDATE, newGraphIndex)
  router.push(ROUTE_NETWORK_GRAPHS)
}

export default setFilteredEdges
