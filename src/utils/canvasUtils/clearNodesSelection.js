import { NODE_BACKGROUND } from '../../constants/graph'
import store from '../../store'

/**
 * Clear selected nodes in canvas
 * @return { undefined }
 */
const clearNodesSelection = () => {
  const {
    availableNodes,
    selectedBoundingBoxNodes
  } = store.getState()

  if (selectedBoundingBoxNodes.length > 0) {
    selectedBoundingBoxNodes.map((nodeId) => availableNodes.update(
      [{ id: nodeId, color: { background: NODE_BACKGROUND } }]
    ))
  }
}

export default clearNodesSelection
