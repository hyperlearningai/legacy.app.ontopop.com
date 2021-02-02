import { ALGO_TYPE_EDGES_FILTER } from '../constants/algorithms'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import store from '../store'

/**
 * Set neighbout edges
 * @param  {Object}   params
 * @param  {Array}    params.edgesFilters              Array of edge filters {property [string], value [string]}
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.addToObject           update graph data function
 * @return
 */
const setFilteredEdges = ({
  setStoreState,
  edgesFilters,
  addToObject
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
    }
  }

  addToObject('graphData', newCurrentGraph, graphValue)
  setStoreState('currentGraph', newCurrentGraph)
  setStoreState('lastGraphIndex', newGraphIndex)
  setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
}

export default setFilteredEdges
