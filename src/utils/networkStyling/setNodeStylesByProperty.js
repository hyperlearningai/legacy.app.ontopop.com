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
      styleNodeByProperty({
        property,
        nodeId
      })
    }
  }
}

export default setNodeStylesByProperty
