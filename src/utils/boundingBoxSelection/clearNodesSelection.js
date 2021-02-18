import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Clear selected nodes in canvas
 * @return { undefined }
 */
const clearNodesSelection = () => {
  const {
    selectedBoundingBoxNodes,
    stylingNodeBackgroundColor
  } = store.getState()

  if (selectedBoundingBoxNodes.length > 0) {
    selectedBoundingBoxNodes.map((node) => {
      const color = node.color || { }
      color.background = stylingNodeBackgroundColor

      return updateNodes(
        [{
          id: node.id,
          color
        }]
      )
    })
  }
}

export default clearNodesSelection
