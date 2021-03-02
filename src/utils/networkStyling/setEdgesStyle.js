import resetEdgesStyles from './resetEdgesStyles'
import setEdgesStylesByProperty from './setEdgesStylesByProperty'
import setHighlightedEdges from './setHighlightedEdges'

/**
 * Update edges style
 * @return { undefined }
 */
const setEdgesStyle = () => {
  resetEdgesStyles()

  setEdgesStylesByProperty()

  setHighlightedEdges()
}

export default setEdgesStyle
