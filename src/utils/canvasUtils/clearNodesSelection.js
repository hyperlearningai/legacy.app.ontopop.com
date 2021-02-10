import { NODE_BACKGROUND } from '../../constants/graph'
import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Clear selected nodes in canvas
 * @return { undefined }
 */
const clearNodesSelection = () => {
  const {
    selectedBoundingBoxNodes
  } = store.getState()

  if (selectedBoundingBoxNodes.length > 0) {
    selectedBoundingBoxNodes.map((nodeId) => updateNodes(
      [{ id: nodeId, color: { background: NODE_BACKGROUND } }]
    ))
  }
}

export default clearNodesSelection
