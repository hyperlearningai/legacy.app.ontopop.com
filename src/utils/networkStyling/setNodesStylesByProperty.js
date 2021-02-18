import store from '../../store'
import styleNodesByProperty from './styleNodesByProperty'

/**
  Set nodes style based on properties
 * @return { undefined }
 */
const setNodesStylesByProperty = () => {
  const {
    stylingNodeByProperty,
  } = store.getState()

  if (stylingNodeByProperty.length === 0) return false

  // update node style
  stylingNodeByProperty.map((property) => {
    const {
      styleValue, filterValue
    } = property

    if (
      styleValue
        && styleValue !== ''
        && styleValue !== 0
        && filterValue
        && filterValue !== ''
    ) {
      styleNodesByProperty({ property })
    }

    return true
  })
}

export default setNodesStylesByProperty
