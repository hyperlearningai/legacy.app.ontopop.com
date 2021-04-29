import store from '../../store'
import styleEdgesByProperty from './styleEdgesByProperty'

/**
 * Set edges style based on properties
 * @return { undefined }
 */
const setEdgesStylesByProperty = () => {
  const {
    stylingEdgeByProperty,
  } = store.getState()

  if (stylingEdgeByProperty.length === 0) return false

  // update edge style
  const stylingEdgeByPropertyLength = stylingEdgeByProperty.length - 1

  for (let index = stylingEdgeByPropertyLength; index >= 0; index--) {
    const property = stylingEdgeByProperty[stylingEdgeByPropertyLength - index]

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
      styleEdgesByProperty({ property })
    }
  }
}

export default setEdgesStylesByProperty
