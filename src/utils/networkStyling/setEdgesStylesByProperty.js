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
  stylingEdgeByProperty.map((property) => {
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

    return true
  })
}

export default setEdgesStylesByProperty
