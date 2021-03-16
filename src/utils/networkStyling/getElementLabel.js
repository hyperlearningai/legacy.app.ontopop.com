import { USER_DEFINED_PROPERTY } from '../../constants/graph'
import store from '../../store'

/**
 * Get element label
 * @param  {Object}   params
 * @param  {String}   params.type           Element type: node vs edge
 * @param  {String}   params.elementId      Element id
 * @return {String}   label                 Element label
 */
const getElementLabel = ({
  type,
  id
}) => {
  const {
    globalEdgeStyling,
    userDefinedEdgeStyling,
    globalNodeStyling,
    userDefinedNodeStyling,
    classesFromApiBackup,
    objectPropertiesFromApiBackup
  } = store.getState()

  if (type === 'node') {
    const node = classesFromApiBackup[id]

    const {
      stylingNodeCaptionProperty
    } = node[USER_DEFINED_PROPERTY] ? userDefinedNodeStyling : globalNodeStyling

    return node[stylingNodeCaptionProperty] ? node[stylingNodeCaptionProperty].split(' ').join('\n') : ''
  }

  const edge = objectPropertiesFromApiBackup[id]

  const {
    stylingEdgeCaptionProperty
  } = edge[USER_DEFINED_PROPERTY] ? userDefinedEdgeStyling : globalEdgeStyling

  return edge[stylingEdgeCaptionProperty] || ''
}

export default getElementLabel
