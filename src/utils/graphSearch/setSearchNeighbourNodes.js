import { ALGO_TYPE_SEARCH_NEIGHBOURHOOD } from '../../constants/algorithms'
import { ROUTE_NETWORK_GRAPHS } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'

/**
 * Set neighbout nodes
 * @param  {Object}   params
 * @param  {Number}   params.separationDegree          Separation degree integer
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @param  {Class}    params.router                    NextJs router class
 * @param  {Object}   params.searchResult              Selected node or edge object
 * @return { undefined }
 */
const setSearchNeighbourNodes = ({
  separationDegree,
  updateStoreValue,
  searchResult,
  router
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

  const {
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

export default setSearchNeighbourNodes
