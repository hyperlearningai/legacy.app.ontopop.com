import resetNodesStyles from './resetNodesStyles'
import setHighlightedNodes from './setHighlightedNodes'
import setNodesOverlay from './setNodesOverlay'
import setNodesStylesByProperty from './setNodesStylesByProperty'
import setUserDefinedNodesStyles from './setUserDefinedNodesStyles'
import addNodesBorders from './addNodesBorders'

/**
 * Update node styles
 * @return { undefined }
 */
const setNodesStyle = () => {
  resetNodesStyles()

  setUserDefinedNodesStyles()

  setNodesStylesByProperty()

  setHighlightedNodes()

  setNodesOverlay()

  addNodesBorders()
}

export default setNodesStyle
