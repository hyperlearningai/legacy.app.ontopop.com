import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Search and update edges based on property filter
 * @param  {Object}   params
 * @param  {Object}   params.property           Property filter object
 * @param  {String}   params.edgeId             Edge ID
 * @return { undefined }
 */
const styleEdgeByProperty = ({
  property,
  edgeId
}) => {
  const {
    property: propertyToCheck,
    filterType,
    filterValue,
    styleType,
    styleValue
  } = property

  const edge = getEdge(edgeId)

  const edgeProperty = edge[propertyToCheck]

  if (!edgeProperty) return false

  const isStylable = filterType === 'equal'
    ? edgeProperty.toLowerCase() === filterValue.toLowerCase()
    : edgeProperty.toLowerCase().includes(filterValue.toLowerCase())

  if (!isStylable) return false

  const propertyToUpdate = {}

  switch (styleType) {
    case 'stylingEdgeWidth':
      propertyToUpdate.width = styleValue
      break

    case 'stylingEdgeTextColor':
      propertyToUpdate.font = edge.font || {}

      propertyToUpdate.font.color = styleValue
      break
    case 'stylingEdgeTextSize':
      propertyToUpdate.font = edge.font || {}

      propertyToUpdate.font.size = styleValue
      break
    case 'stylingEdgeTextAlign':
      propertyToUpdate.font = edge.font || {}

      propertyToUpdate.font.align = styleValue
      break

    case 'stylingEdgeLineColor':
      propertyToUpdate.color = edge.color || {}

      propertyToUpdate.color.color = styleValue
      break
    case 'stylingEdgeLineColorHighlight':
      propertyToUpdate.color = edge.color || {}

      propertyToUpdate.color.highlight = styleValue
      break

    case 'stylingEdgeLineColorHover':
      propertyToUpdate.color = edge.color || {}

      propertyToUpdate.color.hover = styleValue
      break

    default:
      propertyToUpdate.dashes = styleValue
      break
  }

  updateEdges({
    id: edgeId,
    ...propertyToUpdate
  })
}

export default styleEdgeByProperty
