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
  const stylingNodeByPropertyLength = stylingNodeByProperty.length - 1

  for (let index = stylingNodeByPropertyLength; index >= 0; index--) {
    const property = stylingNodeByProperty[stylingNodeByPropertyLength - index]

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
  }
}

export default setNodesStylesByProperty
