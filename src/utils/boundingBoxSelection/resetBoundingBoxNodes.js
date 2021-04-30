import store from '../../store'
import setNodeStyle from '../networkStyling/setNodeStyle'

/**
 * Reset bounding box nodes style
 * @return { undefined }
 */
const resetBoundingBoxNodes = () => {
  const {
    selectedBoundingBoxNodes,
  } = store.getState()

  if (selectedBoundingBoxNodes.length === 0) return false

  const selectedBoundingBoxNodesLength = selectedBoundingBoxNodes.length - 1

  for (let index = selectedBoundingBoxNodesLength; index >= 0; index--) {
    const node = selectedBoundingBoxNodes[selectedBoundingBoxNodesLength - index]

    if (node) {
      setNodeStyle({
        node,
      })
    }
  }
}

export default resetBoundingBoxNodes
