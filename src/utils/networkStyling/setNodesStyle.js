import resetNodesStyles from './resetNodesStyles'
import setHighlightedNodes from './setHighlightedNodes'
import setNodesOverlay from './setNodesOverlay'
import setNodesStylesByProperty from './setNodesStylesByProperty'
import highlightSpiderableNodes from './highlightSpiderableNodes'

/**
 * Update node styles
 * @return { undefined }
 */
const setNodesStyle = () => {
  resetNodesStyles()

  setNodesStylesByProperty()

  setHighlightedNodes()

  setNodesOverlay()

  highlightSpiderableNodes()
}

export default setNodesStyle
