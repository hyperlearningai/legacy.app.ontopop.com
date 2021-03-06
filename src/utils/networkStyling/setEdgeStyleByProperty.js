import store from '../../store'
import styleEdgeByProperty from './styleEdgeByProperty'

/**
 * Set edges style based on properties
 * @param  {Object}   params
 * @param  {String}   params.edgeId             Edge ID
 * @return { undefined }
 */
const setEdgeStyleByProperty = ({
  edgeId
}) => {
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
      styleEdgeByProperty({
        property,
        edgeId
      })
    }

    return true
  })
}

export default setEdgeStyleByProperty
