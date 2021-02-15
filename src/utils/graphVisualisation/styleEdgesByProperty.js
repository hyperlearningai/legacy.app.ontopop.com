import getEdge from '../nodesEdgesUtils/getEdge'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Search and update edges based on property filter
 * @param  {Object}   params
 * @param  {Object}   params.property           Property filter object
 * @return { undefined }
 */
const styleEdgesByProperty = ({
  property,
}) => {
  const {
    property: propertyToCheck,
    filterType,
    filterValue,
    styleType,
    styleValue
  } = property

  const edgesToStyle = getEdge({
    filter: (edge) => {
      const edgeProperty = edge[propertyToCheck]

      if (!edgeProperty) return false

      return filterType === 'equal'
        ? edgeProperty.toLowerCase() === filterValue.toLowerCase()
        : edgeProperty.toLowerCase().includes(filterValue.toLowerCase())
    }
  })

  if (edgesToStyle.length > 0) {
    edgesToStyle.map((edge) => {
      const { id } = edge

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
        id,
        ...propertyToUpdate
      })

      return true
    })
  }
}

export default styleEdgesByProperty
