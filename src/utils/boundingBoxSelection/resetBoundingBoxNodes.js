import store from '../../store'
import setNodeStyle from '../networkStyling/setNodeStyle'

/**
 * Reset bounding box nodes style
 * @return { undefined }
 */
const resetBoundingBoxNodes = () => {
  const {
    selectedBoundingBoxNodes,
    classesFromApi
  } = store.getState()

  if (selectedBoundingBoxNodes.length === 0) return false

  selectedBoundingBoxNodes.forEach((nodeId) => {
    const node = classesFromApi[nodeId]

    if (node) {
      setNodeStyle({
        node,
      })
    }
  })
}

export default resetBoundingBoxNodes
