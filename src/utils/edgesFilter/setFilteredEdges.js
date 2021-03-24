import { ALGO_TYPE_EDGES_FILTER } from '../../constants/algorithms'
import { DEFAULT_GRAPH_VISUALISATION_OPTIONS } from '../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import store from '../../store'

/**
 * Set neighbout edges
 * @param  {Object}   params
 * @param  {Array}    params.edgesFilters              Array of edge filters {property [string], value [string]}
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @return
 */
const setFilteredEdges = ({
  updateStoreValue,
  edgesFilters,
}) => {
  const {
    lastGraphIndex,
  } = store.getState()

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const label = `edges-filter-${newCurrentGraph}`

  const graphValue = {
    label,
    type: ALGO_TYPE_EDGES_FILTER,
    options: {
      edgesFilters
    },
    ...DEFAULT_GRAPH_VISUALISATION_OPTIONS
  }

  updateStoreValue(['graphData', newCurrentGraph], OPERATION_TYPE_UPDATE, graphValue)
  updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, newCurrentGraph)
  updateStoreValue(['lastGraphIndex'], OPERATION_TYPE_UPDATE, newGraphIndex)
  updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_GRAPHS)
}

export default setFilteredEdges
