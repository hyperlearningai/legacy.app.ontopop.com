import { ALGO_TYPE_BOUNDING_BOX } from '../../constants/algorithms'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import store from '../../store'

/**
 * Set nodes inside bounding box
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.addToObject           Add to object action
 * @return { undefined }
 */
const setBoundingBoxNodes = ({
  setStoreState,
  addToObject
}) => {
  const {
    lastGraphIndex,
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
    }
  }

  addToObject('graphData', newCurrentGraph, graphValue)
  setStoreState('currentGraph', newCurrentGraph)
  setStoreState('lastGraphIndex', newGraphIndex)
  setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
}

export default setBoundingBoxNodes
