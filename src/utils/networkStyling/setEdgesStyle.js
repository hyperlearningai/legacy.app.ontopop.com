import resetEdgesStyles from './resetEdgesStyles'
import setEdgesStylesByProperty from './setEdgesStylesByProperty'
import setUserDefinedEdgesStyles from './setUserDefinedEdgesStyles'

/**
 * Update edges style
 * @return { undefined }
 */
const setEdgesStyle = () => {
  resetEdgesStyles()

  setUserDefinedEdgesStyles()

  setEdgesStylesByProperty()
}

export default setEdgesStyle
