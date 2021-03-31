import { ALGO_TYPE_NEIGHBOURHOOD } from '../../constants/algorithms'
import { ROUTE_NETWORK_GRAPHS } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'

/**
 * Set neighbout nodes
 * @param  {Object}   params
 * @param  {Number}   params.separationDegree          Separation degree integer
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @param  {Class}    params.router                    router class
 * @return { undefined }
 */
const setNeighbourNodes = ({
  separationDegree,
  updateStoreValue,
  router
}) => {
  const {
    classesFromApi,
    selectedElement,
    lastGraphIndex,
    currentGraph,
    graphData
  } = store.getState()

  const [selectedNeighbourNode, selectedNodeType] = selectedElement ? Object.entries(selectedElement)[0] : [undefined, false]

  if (selectedNodeType !== 'node') return false

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const selectedNodeId = classesFromApi[selectedNeighbourNode] ? classesFromApi[selectedNeighbourNode].id : ''
  const label = `neighbourhood-${newCurrentGraph}`

  const {
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties
  } = graphData[currentGraph]

  const graphValue = {
    label,
    type: ALGO_TYPE_NEIGHBOURHOOD,
    options: {
      selectedNodeId,
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

export default setNeighbourNodes
