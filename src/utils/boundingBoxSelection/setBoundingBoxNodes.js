import { ALGO_TYPE_BOUNDING_BOX } from '../../constants/algorithms'
import { ROUTE_NETWORK_GRAPHS } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'

/**
 * Set nodes inside bounding box
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue             updateStoreValue action
 * @param  {Class}    params.router                       router class
 * @return { undefined }
 */
const setBoundingBoxNodes = ({
  updateStoreValue,
  router
}) => {
  const {
    lastGraphIndex,
    selectedBoundingBoxNodes,
    graphData,
    currentGraph
  } = store.getState()

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const label = `bounding-box-${newCurrentGraph}`

  const {
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties
  } = graphData[currentGraph]

  const graphValue = {
    label,
    type: ALGO_TYPE_BOUNDING_BOX,
    options: {
      selectedBoundingBoxNodes,
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

export default setBoundingBoxNodes
