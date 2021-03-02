import { ALGO_TYPE_SEARCH_NEIGHBOURHOOD } from '../../constants/algorithms'
import { MAIN_VIEW_GRAPH, SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import store from '../../store'

/**
 * Set neighbout nodes
 * @param  {Object}   params
 * @param  {Number}   params.separationDegree          Separation degree integer
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.addToObject               Add to object action
 * @param  {Function} params.addToObject               Add to object action
 * @return { undefined }
 */
const setSearchNeighbourNodes = ({
  separationDegree,
  setStoreState,
  addToObject,
  searchResult
}) => {
  const {
    lastGraphIndex,
  } = store.getState()

  const {
    id,
    type,
    from,
    to
  } = searchResult

  const selectedNodesId = []
  const selectedEdgesId = []

  if (type === 'node') {
    selectedNodesId.push(id)
  }

  if (type === 'edge') {
    selectedEdgesId.push(id)

    selectedNodesId.push(from)
    selectedNodesId.push(to)
  }
  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const label = `search-${newCurrentGraph}`

  const graphValue = {
    label,
    type: ALGO_TYPE_SEARCH_NEIGHBOURHOOD,
    options: {
      selectedNodesId,
      selectedEdgesId,
      separationDegree,
    }
  }

  addToObject('graphData', newCurrentGraph, graphValue)
  setStoreState('currentGraph', newCurrentGraph)
  setStoreState('lastGraphIndex', newGraphIndex)
  setStoreState('mainVisualisation', MAIN_VIEW_GRAPH)
  setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
}

export default setSearchNeighbourNodes
