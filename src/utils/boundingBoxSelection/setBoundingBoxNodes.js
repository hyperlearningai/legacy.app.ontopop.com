import { ALGO_TYPE_BOUNDING_BOX } from '../../constants/algorithms'
import { ROUTE_NETWORK_GRAPHS } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import store from '../../store'
import setPageView from '../analytics/setPageView'

/**
 * Set nodes inside bounding box
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue             updateStoreValue action
 * @return { undefined }
 */
const setBoundingBoxNodes = ({
  updateStoreValue,
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
    type: ALGO_TYPE_BOUNDING_BOX,
    options: {
      selectedBoundingBoxNodes,
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

export default setBoundingBoxNodes
