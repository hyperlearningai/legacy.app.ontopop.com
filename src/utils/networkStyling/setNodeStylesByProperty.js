import store from '../../store'
import styleNodeByProperty from './styleNodeByProperty'

/**
 * Set node style based on properties
 * @param  {Object}   params
 * @param  {String}   params.nodeId           Node ID
 * @return { undefined }
 */
const setNodeStylesByProperty = ({
  nodeId
}) => {
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
      styleNodeByProperty({
        property,
        nodeId
      })
    }

    return true
  })
}

export default setNodeStylesByProperty
