import resetNodesStyles from './resetNodesStyles'
import setHighlightedNodes from './setHighlightedNodes'
import setNodesOverlay from './setNodesOverlay'
import setNodesStylesByProperty from './setNodesStylesByProperty'
import highlightSpiderableNodes from './highlightSpiderableNodes'
import setUserDefinedNodesStyles from './setUserDefinedNodesStyles'

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

  highlightSpiderableNodes()
}

export default setNodesStyle
