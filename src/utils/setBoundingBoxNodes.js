import { ALGO_TYPE_BOUNDING_BOX } from '../constants/algorithms'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import store from '../store'

/**
 * Set nodes inside bounding box
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.updateGraphData           update graph data function
 * @return
 */
const setBoundingBoxNodes = ({
  setStoreState,
  updateGraphData
}) => {
  const {
    lastGraphIndex,
    triplesPerNode,
    selectedBoundingBoxNodes
  } = store.getState()

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const label = `bounding-box-${newCurrentGraph}`

  const graphValue = {
    label,
    type: ALGO_TYPE_BOUNDING_BOX,
    options: {
      selectedBoundingBoxNodes,
      triplesPerNode
    }
  }

  updateGraphData(newCurrentGraph, graphValue)
  setStoreState('currentGraph', newCurrentGraph)
  setStoreState('lastGraphIndex', newGraphIndex)
  setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
}

export default setBoundingBoxNodes
