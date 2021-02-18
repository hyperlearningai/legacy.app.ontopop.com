import resetEdgesStyles from './resetEdgesStyles'
import resetNodesStyles from './resetNodesStyles'
import setHighlightedNodes from './setHighlightedNodes'
import setNodesOverlay from './setNodesOverlay'
import setEdgesStylesByProperty from './setEdgesStylesByProperty'
import setNodesStylesByProperty from './setNodesStylesByProperty'
import highlightSpiderableNodes from './highlightSpiderableNodes'

/**
 * Update store and graph based on node IDs to display
 * @return { undefined }
 */
const setElementsStyle = () => {
  // reset node styles previously modified
  resetNodesStyles()

  // reset edges styles previously modified
  resetEdgesStyles()

  // update nodes style by property
  setNodesStylesByProperty()

  // update edges style by property
  setEdgesStylesByProperty()

  // check if highlighted nodes
  setHighlightedNodes()

  // node overlay
  setNodesOverlay()

  // check if nodes are spiderable
  highlightSpiderableNodes()
}

export default setElementsStyle
