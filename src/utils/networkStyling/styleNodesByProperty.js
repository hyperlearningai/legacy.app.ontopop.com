import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Search and update nodes based on property filter
 * @param  {Object}   params
 * @param  {Object}   params.property           Property filter object
 * @return { undefined }
 */
const styleNodesByProperty = ({
  property,
}) => {
  const {
    property: propertyToCheck,
    filterType,
    filterValue,
    styleType,
    styleValue
  } = property

  const nodesToStyle = getNode({
    filter: (node) => {
      const nodeProperty = node[propertyToCheck]

      if (!nodeProperty) return false

      return filterType === 'equal'
        ? nodeProperty.toLowerCase() === filterValue.toLowerCase()
        : nodeProperty.toLowerCase().includes(filterValue.toLowerCase())
    }
  })

  if (nodesToStyle.length === 0) return false

  const nodesToStyleLength = nodesToStyle.length - 1

  for (let nodeIndex = nodesToStyleLength; nodeIndex >= 0; nodeIndex--) {
    const node = nodesToStyle[nodesToStyleLength - nodeIndex]

    const { id } = node

    const propertyToUpdate = {}

    switch (styleType) {
      case 'stylingNodeBorder':
        propertyToUpdate.borderWidth = styleValue
        break
      case 'stylingNodeBorderSelected':
        propertyToUpdate.borderWidthSelected = styleValue
        break
      case 'stylingNodeTextFontSize':
        propertyToUpdate.font = node.font || {}

        propertyToUpdate.font.size = styleValue
        break
      case 'stylingNodeTextColor':
        propertyToUpdate.font = node.font || {}

        propertyToUpdate.font.color = styleValue
        break
      case 'stylingNodeTextFontAlign':
        propertyToUpdate.font = node.font || {}

        propertyToUpdate.font.align = styleValue
        break
      case 'stylingNodeShape':
        propertyToUpdate.shape = styleValue
        break
      case 'stylingNodeBackgroundColor':
        propertyToUpdate.color = node.color || {}

        propertyToUpdate.color.background = styleValue
        break
      case 'stylingNodeBorderColor':
        propertyToUpdate.color = node.color || {}

        propertyToUpdate.color.border = styleValue
        break

      case 'stylingNodeHighlightBackgroundColor':
        propertyToUpdate.color = node.color || {}

        if (!propertyToUpdate.color.highlight) {
          propertyToUpdate.color.highlight = {}
        }
        propertyToUpdate.color.highlight.background = styleValue
        break

      case 'stylingNodeHighlightBorderColor':
        propertyToUpdate.color = node.color || {}

        if (!propertyToUpdate.color.highlight) {
          propertyToUpdate.color.highlight = {}
        }
        propertyToUpdate.color.highlight.border = styleValue
        break

      case 'stylingNodeHoverBackgroundColor':
        propertyToUpdate.color = node.color || {}

        if (!propertyToUpdate.color.hover) {
          propertyToUpdate.color.hover = {}
        }
        propertyToUpdate.color.hover.background = styleValue
        break

      case 'stylingNodeHoverBorderColor':
        propertyToUpdate.color = node.color || {}

        if (!propertyToUpdate.color.hover) {
          propertyToUpdate.color.hover = {}
        }
        propertyToUpdate.color.hover.border = styleValue
        break
      default:
        propertyToUpdate.size = styleValue
        break
    }

    updateNodes({
      id,
      ...propertyToUpdate
    })
  }
}

export default styleNodesByProperty
