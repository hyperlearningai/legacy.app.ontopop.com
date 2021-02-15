import updateNodes from '../nodesEdgesUtils/updateNodes'
import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'

/**
 * Reset nodes which have been styled
 * @return { undefined }
 */
const resetNodesStyles = () => {
  const {
    stylingNodeBorder,
    stylingNodeBorderSelected,
    stylingNodeTextFontSize,
    stylingNodeTextColor,
    stylingNodeTextFontAlign,
    stylingNodeShape,
    stylingNodeBackgroundColor,
    stylingNodeBorderColor,
    stylingNodeHighlightBackgroundColor,
    stylingNodeHighlightBorderColor,
    stylingNodeHoverBackgroundColor,
    stylingNodeHoverBorderColor,
    stylingNodeSize
  } = store.getState()

  const styleProperties = ['color', 'font', 'shape', 'size', 'borderWidth', 'borderWidthSelected']

  const nodesToReset = getNode({
    filter: (node) => styleProperties.some((styleProperty) => node[styleProperty])
  })

  if (nodesToReset.length > 0) {
    nodesToReset.map((node) => {
      const { id } = node

      const propertyToUpdate = {
        borderWidth: stylingNodeBorder,
        borderWidthSelected: stylingNodeBorderSelected,
        font: {
          size: stylingNodeTextFontSize,
          color: stylingNodeTextColor,
          align: stylingNodeTextFontAlign,
          face: 'Montserrat',
          bold: '700'
        },
        shape: stylingNodeShape,
        color: {
          background: stylingNodeBackgroundColor,
          border: stylingNodeBorderColor,
          highlight: {
            background: stylingNodeHighlightBackgroundColor,
            border: stylingNodeHighlightBorderColor,
          },
          hover: {
            background: stylingNodeHoverBackgroundColor,
            border: stylingNodeHoverBorderColor,
          },
        },
        size: stylingNodeSize
      }

      updateNodes({
        id,
        ...propertyToUpdate
      })

      return true
    })
  }
}

export default resetNodesStyles
