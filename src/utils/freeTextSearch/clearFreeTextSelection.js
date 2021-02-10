import { NODE_BACKGROUND } from '../../constants/graph'
import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Clear free text selected nodes in canvas
 * @return { undefined }
 */
const clearFreeTextSelection = () => {
  const {
    freeTextSelection
  } = store.getState()

  if (Object.keys(freeTextSelection).length > 0) {
    Object.keys(freeTextSelection).map((elementId) => {
      const elementType = freeTextSelection[elementId]

      if (elementType === 'node') {
        updateNodes(
          [{ id: elementId, color: { background: NODE_BACKGROUND } }]
        )
      }

      return false
    })
  }
}

export default clearFreeTextSelection
