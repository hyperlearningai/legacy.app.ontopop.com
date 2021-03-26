import { NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT } from '../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'

/**
 * Update stylingEdgeByProperty and stylingNodeByProperty
 * @param  {Object}   params
 * @param  {String}   params.type                    Element type [node | edge]
 * @param  {String}   params.operation               Operation type [save | delete]
 * @param  {String}   params.index                   Item index in stylingEdgeByProperty or stylingNodeByProperty array
 * @param  {Object}   params.stylingPropertyObject   Object to update
 * @param  {Function} params.updateStoreValue        updateStoreValue action
 * @return {undefined}
 */
const updateStylingByProperties = ({
  type,
  operation,
  index,
  stylingPropertyObject,
  updateStoreValue
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

  updateStoreValue([storeState], OPERATION_TYPE_UPDATE, stylingByPropertyObject)
}

export default updateStylingByProperties
