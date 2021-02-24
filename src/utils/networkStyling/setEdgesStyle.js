import resetEdgesStyles from './resetEdgesStyles'
import setEdgesStylesByProperty from './setEdgesStylesByProperty'

/**
 * Update edges style
 * @return { undefined }
 */
const setEdgesStyle = () => {
  resetEdgesStyles()

  setEdgesStylesByProperty()
}

export default setEdgesStyle
