import { ALGO_TYPE_NODES_FILTER } from '../constants/algorithms'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import store from '../store'

/**
 * Set neighbout nodes
 * @param  {Object}   params
 * @param  {Array}    params.nodesFilters              Array of node filters {property [string], value [string]}
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.addToObject           update graph data function
 * @return
 */
const setFilteredNodes = ({
  setStoreState,
  nodesFilters,
  addToObject
}) => {
  const {
    lastGraphIndex,
  } = store.getState()

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const label = `nodes-filter-${newCurrentGraph}`

  const graphValue = {
    label,
    type: ALGO_TYPE_NODES_FILTER,
    options: {
      nodesFilters
    }
  }

  addToObject('graphData', newCurrentGraph, graphValue)
  setStoreState('currentGraph', newCurrentGraph)
  setStoreState('lastGraphIndex', newGraphIndex)
  setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
}

export default setFilteredNodes
