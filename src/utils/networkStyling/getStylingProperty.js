import { USER_DEFINED_PROPERTY } from '../../constants/graph'
import store from '../../store'

/**
 * Get styling property
 * @param  {Object}   params
 * @param  {String}   params.type           Element type: node vs edge
 * @param  {String}   params.property       Property to lookup
 * @param  {Object}   params.element        Element object
 * @return {String}   property              Property value
 */
const getStylingProperty = ({
  type,
  property,
  element
}) => {
  const {
    globalEdgeStyling,
    userDefinedEdgeStyling,
    globalNodeStyling,
    userDefinedNodeStyling,
  } = store.getState()

  if (type === 'node') {
    const style = element[USER_DEFINED_PROPERTY] ? userDefinedNodeStyling : globalNodeStyling

    return style[property]
  }

  const style = element[USER_DEFINED_PROPERTY] ? userDefinedEdgeStyling : globalEdgeStyling

  return style[property]
}

export default getStylingProperty
