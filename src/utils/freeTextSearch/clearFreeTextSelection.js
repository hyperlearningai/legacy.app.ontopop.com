import { NODE_BACKGROUND } from '../../constants/graph'
import store from '../../store'

/**
 * Clear free text selected nodes in canvas
 * @return { undefined }
 */
const clearFreeTextSelection = () => {
  const {
    availableNodes,
    freeTextSelection
  } = store.getState()

  if (Object.keys(freeTextSelection).length > 0) {
    Object.keys(freeTextSelection).map((elementId) => {
      const elementType = freeTextSelection[elementId]

      if (elementType === 'node') {
        availableNodes.update(
          [{ id: elementId, color: { background: NODE_BACKGROUND } }]
        )
      }

      return false
    })
  }
}

export default clearFreeTextSelection
