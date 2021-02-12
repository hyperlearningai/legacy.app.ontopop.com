import { NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT } from '../../constants/graph'
import store from '../../store'

/**
 * Update stylingEdgeByProperty and stylingNodeByProperty
 * @param  {Object}   params
 * @param  {String}   params.type                    Element type [node | edge]
 * @param  {String}   params.operation               Operation type [save | delete]
 * @param  {String}   params.index                   Item index in stylingEdgeByProperty or stylingNodeByProperty array
 * @param  {Object}   params.stylingPropertyObject   Object to update
 * @param  {Function} params.setStoreState           setStoreState action
 * @return {undefined}
 */
const updateStylingByProperties = ({
  type,
  operation,
  index,
  stylingPropertyObject,
  setStoreState
}) => {
  const {
    stylingEdgeByProperty,
    stylingNodeByProperty
  } = store.getState()

  const storeState = type === 'edge' ? 'stylingEdgeByProperty' : 'stylingNodeByProperty'
  const stylingByPropertyObject = JSON.parse(JSON.stringify(
    type === 'edge' ? stylingEdgeByProperty : stylingNodeByProperty
  ))

  const defaultStylingByPropertyObject = JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT))

  if (operation === 'delete') {
    stylingByPropertyObject.splice(index, 1)
  } else if (stylingByPropertyObject[index]) {
    stylingByPropertyObject[index] = stylingPropertyObject

    if (!stylingByPropertyObject.includes(defaultStylingByPropertyObject)) {
      stylingByPropertyObject.push(defaultStylingByPropertyObject)
    }
  } else {
    stylingByPropertyObject.push(stylingPropertyObject)

    if (!stylingByPropertyObject.includes(defaultStylingByPropertyObject)) {
      stylingByPropertyObject.push(defaultStylingByPropertyObject)
    }
  }

  setStoreState(storeState, stylingByPropertyObject)
}

export default updateStylingByProperties
