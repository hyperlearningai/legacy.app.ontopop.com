import resetEdgesStyles from './resetEdgesStyles'
import setEdgesStylesByProperty from './setEdgesStylesByProperty'
import setUserDefinedEdgesStyles from './setUserDefinedEdgesStyles'
import setHighlightedEdges from './setHighlightedEdges'

/**
 * Update edges style
 * @return { undefined }
 */
const setEdgesStyle = () => {
  resetEdgesStyles()

  setUserDefinedEdgesStyles()

  setEdgesStylesByProperty()

  setHighlightedEdges()
}

export default setEdgesStyle
